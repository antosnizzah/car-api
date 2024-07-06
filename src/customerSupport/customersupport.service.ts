import db from "../drizzle/db";
import { CustomerSupportTicketsTable,TICustomerSupportTickets,TSCustomerSupportTickets } from "../drizzle/schema";

import { eq } from "drizzle-orm";



// GET ALLCustomerSupportTickets
export const getCustomerSupportTicketsService = async ()=>{
    return await db.query.CustomerSupportTicketsTable.findMany();
}

// GET CustomerSupportTickets BY ID
export const getCustomerSupportTicketsByIdService = async (id: number) => {
    const booking = await db.query.CustomerSupportTicketsTable.findFirst({
        where: eq(CustomerSupportTicketsTable.ticket_id, id),
    });
}

// CREATE CustomerSupportTickets
export const createCustomerSupportTicketsService = async (item: TICustomerSupportTickets) => {
    await db.insert(CustomerSupportTicketsTable).values(item)
    return "CustomerSupportTickets created successfully";
}

//  UPDATE CustomerSupportTickets
export const updateCustomerSupportTicketsService = async(id: number, res: any): Promise<string | undefined>=> {
    await db.update(CustomerSupportTicketsTable).set(res).where(eq(CustomerSupportTicketsTable.ticket_id, id))
    return "CustomerSupportTickets updated successfully";

}
// DELETE CustomerSupportTickets
export const deleteCustomerSupportTicketsService= async (id:number):Promise<boolean>=>{
    await db.delete(CustomerSupportTicketsTable).where(eq(CustomerSupportTicketsTable.ticket_id,id)).returning()
    return true
 }

