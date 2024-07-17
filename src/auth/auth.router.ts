import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { register, login, verifyEmail } from './auth.controller';
import { registerSchema, authorizeSchema } from '../validator';

export const authRouter = new Hono();

authRouter.post('/register', zValidator('json', registerSchema, (result, c) => {
    if (!result.success) return c.json(result.error, 400);
}), register);

authRouter.post('/login', zValidator('json', authorizeSchema, (result, c) => {
    if (!result.success) return c.json(result.error, 400);
}), login);

authRouter.get('/verify', verifyEmail);
