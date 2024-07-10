import db from "../drizzle/db";
import { UsersTable ,TIUser ,TSUser} from "../drizzle/schema";

import { eq } from "drizzle-orm"; 



// GET ALL Users with a limit
export const getUsersService = async ()=>{
    return await db.query.UsersTable.findMany();
}

// GET Users BY ID
export const getUsersByIdService = async (id: number) => {
    const user = await db.query.UsersTable.findFirst({
        where: eq(UsersTable.user_id, id),
        columns: {
            full_name: true,
            contact_phone: true,
            email: true
        }
    });
    return user;
}

// CREATE Users
export const createUsersService = async (item: TIUser) => {
    await db.insert(UsersTable).values(item)
    return "User created successfully";
}

//  UPDATE Users
export const updateUsersService = async(id: number, res: any): Promise<string | undefined>=> {
    await db.update(UsersTable).set(res).where(eq(UsersTable.user_id, id))
    return "User updated successfully";

}
// DELETE Users
export const deleteUsersService= async (id:number):Promise<boolean>=>{
    await db.delete(UsersTable).where(eq(UsersTable.user_id,id)).returning()
    return true
 }

