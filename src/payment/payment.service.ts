import db from "../drizzle/db";
import { PaymentTable,TIPayment } from "../drizzle/schema";

import { eq } from "drizzle-orm";



// GET ALL Payment
export const getPaymentTableService = async ()=>{
    return await db.query.PaymentTable.findMany();
}

// GET Payment BY ID
export const getPaymentTableByIdService = async (id: number) => {
    const Payment = await db.query.PaymentTable.findFirst({
        where: eq(PaymentTable.payment_id, id),
    });
}

// CREATEPayment
export const createPaymentService = async (item: TIPayment) => {
    await db.insert(PaymentTable).values(item)
    return "Payment created successfully";
}

//  UPDATE Payment
export const updatePaymentService = async(id: number, res: any): Promise<string | undefined>=> {
    await db.update (PaymentTable).set(res).where(eq(PaymentTable.payment_id, id))
    return "Payment updated successfully";

}
// DELETE Payment
export const deletePaymentService= async (id:number):Promise<boolean>=>{
    await db.delete(PaymentTable).where(eq(PaymentTable.payment_id,id)).returning()
    return true
 }

