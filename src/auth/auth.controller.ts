import { Context } from "hono";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { v4 as uuidv4 } from 'uuid';
import { createService, userSignService, registerAuthService, checkAuthService, verifyUserService, findUserByEmailService, updateUserResetTokenService, resetPasswordService } from "./auth.service";
import { sendRegistrationEmailTemplate, sendPasswordResetEmailTemplate } from "../mails/emailservices";

export const register = async (c: Context) => {
    try {
        const user = await c.req.json();

        const userExist = await checkAuthService(user.username);
        if (userExist) {
            return c.json({ error: "User already exists" }, 409);
        }

        const verificationToken = uuidv4();
        
        const hashedPassword = await bcrypt.hash(user.password, 10);
        
        user.password = hashedPassword;
        user.verificationToken = verificationToken;
        user.role = user.role || 'user';

        const userId = await createService(user);

        const authUser = {
            user_id: userId,
            username: user.username,
            password: user.password,
            role: user.role,
            email: user.email,
            verificationToken: user.verificationToken,
        };

        const registerAuthMessage = await registerAuthService(authUser);

        const verificationUrl = `http://localhost:8000/auth/verify?token=${verificationToken}`;
        await sendRegistrationEmailTemplate(user.email, 'registered with our service', user.username, verificationUrl);

        return c.json({ message: "User created and registered successfully", authMessage: registerAuthMessage }, 201);
    } catch (err: any) {
        console.error('Error in register controller:', err);
        return c.json({ error: err?.message }, 400);
    }
};

export const login = async (c: Context) => {
    try {
        const user = await c.req.json();

        const userExist = await userSignService(user.username);
        if (!userExist) {
            return c.json({ error: "User not found" }, 404);
        }

        const userMatch = await bcrypt.compare(user.password, userExist.password);
        if (!userMatch) {
            return c.json({ error: "Password does not match" }, 401);
        }

        const payload = {
            user_id: userExist.user_id,
            username: userExist.username,
            role: userExist.role,
            expire: Math.floor(Date.now() / 1000) + (60 * 60)
        };

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }

        const token = await sign(payload, secret);
        return c.json({ token, user: { id: userExist.user_id, username: userExist.username, role: userExist.role } }, 200);
    } catch (err: any) {
        console.error('Error in login controller:', err);
        return c.json({ error: err?.message }, 400);
    }
};

export const verifyEmail = async (c: Context) => {
    try {
        const token = c.req.query('token');
        if (!token) {
            return c.json({ error: "Token is missing" }, 400);
        }

        const message = await verifyUserService(token);
        return c.json({ message }, 200);
    } catch (err: any) {
        console.error('Error in verifyEmail controller:', err);
        return c.json({ error: err?.message }, 400);
    }
};

export const resetPasswordRequest = async (c: Context) => {
    try {
        const { email } = await c.req.json();
        const user = await findUserByEmailService(email);

        if (!user) {
            return c.json({ error: "User not found" }, 404);
        }

        const resetToken = uuidv4();
        const resetUrl = `http://localhost:8000/auth/resetting-password?token=${resetToken}`;
        
        await updateUserResetTokenService(email, resetToken);
        await sendPasswordResetEmailTemplate(email, 'Password Reset Request', user.username, resetUrl);

        return c.json({ message: "Password reset email sent" }, 200);
    } catch (err: any) {
        console.error('Error in resetPasswordRequest controller:', err);
        return c.json({ error: err?.message }, 400);
    }
};

export const resetPassword = async (c: Context) => {
    try {
        const { token, newPassword } = await c.req.json();

        if (!token || !newPassword) {
            return c.json({ error: "Token and new password are required" }, 400);
        }

        const message = await resetPasswordService(token, newPassword);
        return c.json({ message }, 200);
    } catch (err: any) {
        console.error('Error in resetPassword controller:', err);
        return c.json({ error: err?.message }, 400);
    }
};
