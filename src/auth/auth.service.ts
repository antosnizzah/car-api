// interface Tusername {
//     username: string;
// }
// interface Ttoken {
//     token: string;
// }
// interface Tregister {
//     email: string;
//     password: string;
//     username: string;
// }

// interface Temail {
//     email: string;
// }

import { UsersTable, AuthorizeUsersTable, TSAuthorizeUsers, TSUser, TIAuthorizeUsers } from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";
import bcrypt from "bcrypt";
interface Tusername {
    username: string;
}
interface Ttoken {
    token: string;
}
interface Tregister {
    email: string;
    password: string;
    username: string;
}

interface Temail {
    email: string;
}
export const createService = async (user: TSUser): Promise<string> => {
    const [newUser] = await db.insert(UsersTable).values(user).returning({ id: UsersTable.user_id });
    return newUser.id.toString();
}

export const userSignService = async (username: string) => {
    return await db.query.AuthorizeUsersTable.findFirst({
        columns: {
            user_id:true,
            password: true,
            username: true,
            email: true,
            role: true,
            verificationToken: true,
            verified: true
        },
        where: sql`${AuthorizeUsersTable.username} = ${username}`
    });
};

export const registerAuthService = async (user: Tregister): Promise<string> => {
    await db.insert(AuthorizeUsersTable).values(user);
    return "User registered successfully";
};

export const checkAuthService = async (username: string) => {
    return await db.query.AuthorizeUsersTable.findFirst({
        columns: {
            username: true
        },
        where: sql`${AuthorizeUsersTable.username} = ${username}`
    });
};

export const verifyUserService = async (token: string) => {
    const user = await db.query.AuthorizeUsersTable.findFirst({
        where: sql`${AuthorizeUsersTable.verificationToken} = ${token}`
    });

    if (!user) {
        throw new Error("Invalid token");
    }

    await db.update(AuthorizeUsersTable)
        .set({ verified: true, verificationToken: null })  // Set token to null after verification
        .where(sql`${AuthorizeUsersTable.verificationToken} = ${token}`);

    return "Email verified successfully";
};

export const findUserByEmailService = async (email: string) => {
    return await db.query.AuthorizeUsersTable.findFirst({
        columns: {
            id: true,
            username: true,
            email: true,
            user_id: true,
        },
        where: sql`${AuthorizeUsersTable.email} = ${email}`
    });
};

export const updateUserResetTokenService = async (email: string, token: string) => {
    console.log(`Updating reset token for email: ${email} with token: ${token}`);
    const result = await db.update(AuthorizeUsersTable)
        .set({ resetToken: token })
        .where(sql`${AuthorizeUsersTable.email} = ${email}`);
    console.log(`Update result: ${JSON.stringify(result)}`);
};

export const resetPasswordService = async (token: string, newPassword: string) => {
    const user = await db.query.AuthorizeUsersTable.findFirst({
        where: sql`${AuthorizeUsersTable.resetToken} = ${token}`
    });

    if (!user) {
        throw new Error("Invalid or expired reset token");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.update(AuthorizeUsersTable)
        .set({ password: hashedPassword, resetToken: null })
        .where(sql`${AuthorizeUsersTable.resetToken} = ${token}`);

    return "Password reset successfully";
};
