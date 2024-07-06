import db from "../drizzle/db";
import {BookingOfferTable,TIBookingOffer } from "../drizzle/schema";

import { eq } from "drizzle-orm";



// GET ALLBookingOffer
export const getbookingofferService = async ()=>{
    return await db.query.BookingOfferTable.findMany();
}

// GET Bookingoffer BY ID
export const getbookingofferByIdService = async (id: number) => {
    const booking = await db.query.BookingOfferTable.findFirst({
        where: eq(BookingOfferTable.booking_offer_id, id),
    });
}

// CREATE BookingOffer
export const createbookingofferService = async (item: TIBookingOffer) => {
    await db.insert(BookingOfferTable).values(item)
    return "booking offer created successfully";
}

//  UPDATE BookingOffer
export const updatebookingofferService = async(id: number, res: any): Promise<string | undefined>=> {
    await db.update(BookingOfferTable).set(res).where(eq(BookingOfferTable.booking_offer_id, id))
    return "booking offer updated successfully";

}
// DELETE BookingOffer
export const deletebookingofferService= async (id:number):Promise<boolean>=>{
    await db.delete(BookingOfferTable).where(eq(BookingOfferTable.booking_offer_id,id)).returning()
    return true
 }

