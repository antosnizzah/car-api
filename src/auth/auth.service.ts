import { UsersTable, AuthorizeUsersTable,TIAuthorizeUsers,TSAuthorizeUsers,TSUser,TIUser } from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";

interface Tusername{
    username: string;
}
interface Ttoken{
    token: string;
}
interface Tregister{
    password:string,
    username:string,
}

export const createService = async (user: TSUser): Promise<string> => {
    const [newUser] = await db.insert(UsersTable).values(user).returning({ id: UsersTable.user_id });
    return newUser.id.toString();
}
export const userSignService = async (username: Tusername) => {
    return await db.query.AuthorizeUsersTable.findFirst({
        columns: {
            id: true,
            password: true,
            username: true,
            role: true,
            verificationToken: true,
            verified: true
        },
        where: sql`${AuthorizeUsersTable.username} = ${username}`
    });
};

export const registerAuthService = async (user:Tregister): Promise<string> => {
    await db.insert(AuthorizeUsersTable).values(user);
    return "User registered successfully";
};

export const checkAuthService = async (username: Tusername) => {
    return await db.query.AuthorizeUsersTable.findFirst({
        columns: {
            username: true
        },
        where: sql`${AuthorizeUsersTable.username} = ${username}`
    });
};

export const verifyUserService = async (token: Ttoken) => {
    const user = await db.query.AuthorizeUsersTable.findFirst({
        where: sql`${AuthorizeUsersTable.verificationToken} = ${token}`
    });

    if (!user) {
        throw new Error("Invalid token");
    }

    await db.update(AuthorizeUsersTable)
        .set({ verified: true })
        .where(sql`${AuthorizeUsersTable.verificationToken} = ${token}`);

    return "Email verified successfully";
};
