import db from "../drizzle/db";
import { PromotionalOffersTable,TIPromotionalOffers } from "../drizzle/schema";

import { eq } from "drizzle-orm";



// GET all PromotionalOffers
export const getPromotionalOffersService = async ()=>{
    return await db.query.PromotionalOffersTable.findMany();
}

// GET PromotionalOffers BY ID
export const getPromotionalOffersByIdService = async (id: number) => {
    const promotionalOffer = await db.query.PromotionalOffersTable.findFirst({
        where: eq(PromotionalOffersTable.offer_id, id),
    });
    return promotionalOffer;
}

// CREATE PromotionalOffers
export const createPromotionalOffersService = async (item: TIPromotionalOffers) => {
    await db.insert(PromotionalOffersTable).values(item)
    return "PromotionalOffers created successfully";
}

//  UPDATE PromotionalOffers
export const updatePromotionalOffersService = async(id: number, res: any): Promise<string | undefined>=> {
    await db.update(PromotionalOffersTable).set(res).where(eq(PromotionalOffersTable.offer_id, id))
    return "PromotionalOffers updated successfully";

}
// DELETE PromotionalOffers
export const deletePromotionalOffersService= async (id:number):Promise<boolean>=>{
    await db.delete(PromotionalOffersTable).where(eq(PromotionalOffersTable.offer_id,id)).returning()
    return true
 }

