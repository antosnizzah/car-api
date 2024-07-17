import { Context } from "hono";
import { createService, userSignService, registerAuthService, checkAuthService, verifyUserService } from "./auth.service";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { v4 as uuidv4 } from 'uuid';
import { sendRegistrationEmailTemplate } from "../mails/emailservices";

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

        // Insert user into UsersTable and get the user ID
        const userId = await createService(user);

        // Prepare the authorization user object
        const authUser = {
            user_id: userId,
            username: user.username,
            password: user.password,
            role: user.role,
            verificationToken: user.verificationToken
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
            id: userExist.id,
            username: userExist.username,
            role: userExist.role,
            expire: Math.floor(Date.now() / 1000) + (60 * 60)
        };

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }

        const token = await sign(payload, secret);
        return c.json({ token, user: { id: userExist.id, username: userExist.username, role: userExist.role } }, 200);
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

        const message = await verifyUserService({token});
        return c.json({ message }, 200);
    } catch (err: any) {
        console.error('Error in verifyEmail controller:', err);
        return c.json({ error: err?.message }, 400);
    }
};
