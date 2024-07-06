// import { Hono } from "hono";
// import { authorizeUsersSchema,updateauthorizeUsersSchema } from "../validators";
// // import { createAuthorizeUsersController,} from "./auth.controller";
// // import { UserLoginController } from "./auth.controller";
// import { Context } from "hono";
// import db from "../drizzle/db";
// import { eq } from "drizzle-orm";
// import { sql } from "drizzle-orm";
// import { AuthorizeUsersTable } from "../drizzle/schema";

// import { zValidator } from "@hono/zod-validator";

// export const authRouter = new Hono();
// export const authupdateRouter = new Hono();


// // authRouter.post("/register", zValidator('json',authorizeUsersSchema,(result,c)=>{
// //     if(!result.success){
// //         return c.json(result.error, 400)
// //     }

// // }), createAuthorizeUsersController)


// authRouter.post("/register", createAuthorizeUsersController);
// authRouter.post("/login", UserLoginController);


// // authRouter.get("/verify", async (c: Context) => {
// //     const token = c.req.query('token');

// //     if (!token) {
// //         return c.json({ error: "Token is missing" }, 400);
// //     }

// //     const user = await db.query.AuthorizeUsersTable.findFirst({
// //         where: sql`${AuthorizeUsersTable.verificationToken} = ${token}`
// //     });

// //     if (!user) {
// //         return c.json({ error: "Invalid token" }, 400);
// //     }

// //     // Update user to mark as verified
// //     await db.update(AuthorizeUsersTable)
// //         .set({ verified: true })
// //         .where(eq(AuthorizeUsersTable.verificationToken, token));

// //     return c.json({ message: "Email verified successfully" }, 200);
// // });
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { register, login } from './auth.controller';
// import { registerUserSchema, loginUserSchema } from '../validators';

export const authRouter = new Hono();

// Register route
authRouter.post('/register', register);

// Login route
authRouter.post('/login',  login);
