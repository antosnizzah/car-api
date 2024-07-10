import db from "../drizzle/db";
import { BookingTable,TIBooking,TSBooking } from "../drizzle/schema";

import { eq } from "drizzle-orm";



// GET ALLBooking 
export const getbookingService = async ()=>{
    return await db.query.BookingTable.findMany();
}

// GET Booking BY ID
export const getBookingByIdService = async (id: number) => {
    const booking = await db.query.BookingTable.findFirst({
        where: eq(BookingTable.booking_id, id),
    });
    return booking;
}

// CREATE Booking
export const createbookingService = async (item: TIBooking) => {
    await db.insert(BookingTable).values(item)
    return "booking created successfully";
}

//  UPDATE Booking
export const updatebookingService = async(id: number, res: any): Promise<string | undefined>=> {
    await db.update(BookingTable).set(res).where(eq(BookingTable.booking_id, id))
    return "booking updated successfully";

}
// DELETE Users
export const deletebookingService= async (id:number):Promise<boolean>=>{
    await db.delete(BookingTable).where(eq(BookingTable.booking_id,id)).returning()
    return true
 }

