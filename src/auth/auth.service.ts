import { UsersTable, AuthorizeUsersTable } from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";
import bcrypt from 'bcrypt';

// Service to sign up a user
export const createService = async (user: any): Promise<string | null> => {
    await db.insert(UsersTable).values(user);
    return "User created successfully";
}

// Service to authorize a user
export const userSignService = async (username: string) => {
    return await db.query.AuthorizeUsersTable.findFirst({
        columns: {
            id: false,
            password: true,
            username: true,
            role: true
        },
        where: sql`${AuthorizeUsersTable.username} = ${username}`
    });
};

// Login user by inserting the data in authorization table
export const registerAuthService = async (user: any): Promise<string | null> => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userToInsert = {
        user_id: user.user_id,
        username: user.username,
        password: hashedPassword,
        role: user.role || 'user' // Default role
    };

    await db.insert(AuthorizeUsersTable).values(userToInsert);
    return "User registered successfully";
};

// Check if data exists in database
export const checkAuthService = async (username: string) => {
    return await db.query.AuthorizeUsersTable.findFirst({
        columns: {
            username: true
        },
        where: sql`${AuthorizeUsersTable.username} = ${username}`
    });
};
