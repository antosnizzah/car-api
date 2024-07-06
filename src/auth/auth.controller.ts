import "dotenv/config";
import { Context } from "hono";
import  { createService, userSignService, registerAuthService, checkAuthService  } from "./auth.service";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { v4 as uuidv4 } from 'uuid';
import { sendRegistrationEmailTemplate } from "../mails/emailservices";


export const register = async (c: Context) => {
    try {
        const user = await c.req.json();
        
        // Check if user already exists
        const userExist = await checkAuthService(user.username);
        if (userExist) {
            return c.json({ error: "User already exists" }, 409);
        }
        
        // Generate a unique verification token
        const verificationToken = uuidv4();
        user.verificationToken = verificationToken;
       
        const createUserMessage = await createService(user);
        const registerAuthMessage = await registerAuthService(user);
          // Send welcome email with verification link
        const verificationUrl = `http://localhost:8000/auth/verify?token=${verificationToken}`;

        // Send registration email
        const emailResponse = await sendRegistrationEmailTemplate(user.email, 'registered with our service', user.username, verificationUrl);
        console.log("Email response:", emailResponse); // Log email response for debugging
        
        return c.json({ message: createUserMessage, authMessage: registerAuthMessage }, 201);
    } catch (err: any) {
        console.error('Error in register controller:', err);
        return c.json({ error: err?.message }, 400);
    }
};





// Login controller
export const login = async (c: Context) => {
    try {
        const user = await c.req.json();
        
        // Find user
        const userExist = await userSignService(user.username);
        if (!userExist) {
            return c.json({ error: "User not found" }, 404);
        }
        
        // Check password
        const userMatch = await bcrypt.compare(user.password, userExist.password);
        if (!userMatch) {
            return c.json({ error: "Password does not match" }, 401);
        }
        
        // Generate JWT token
        const payload = {
            username: userExist.username,
            role: userExist.role,
            expire: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration
        };

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }

        const token = await sign(payload, secret);
        if (!token) {
            throw new Error('Token generation failed');
        }

        return c.json({ token, user: { username: userExist.username, role: userExist.role } }, 200);
    } catch (err: any) {
        console.error('Error in login controller:', err);
        return c.json({ error: err?.message }, 400);
    }
};