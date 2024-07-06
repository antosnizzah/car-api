import db from "../drizzle/db";
import { MaintainanceRecordTable,TIMaintainanceRecord} from "../drizzle/schema";

import { eq } from "drizzle-orm";



// GET ALLMaintainanceRecord
export const getMaintainanceRecordService = async ()=>{
    return await db.query.MaintainanceRecordTable.findMany();
}

// GET MaintainanceRecord BY ID
export const getMaintainanceRecordByIdService = async (id: number) => {
    const MaintainanceRecord = await db.query.MaintainanceRecordTable.findFirst({
        where: eq(MaintainanceRecordTable.maintenance_id, id),
    });
}

// CREATE MaintainanceRecord
export const createMaintainanceRecordService = async (item: TIMaintainanceRecord) => {
    await db.insert(MaintainanceRecordTable).values(item)
    return "MaintainanceRecord created successfully";
}

//  UPDATE MaintainanceRecord
export const updateMaintainanceRecordService = async(id: number, res: any): Promise<string | undefined>=> {
    await db.update(MaintainanceRecordTable).set(res).where(eq(MaintainanceRecordTable.maintenance_id, id))
    return "MaintainanceRecord updated successfully";

}
// DELETE MaintainanceRecord
export const deleteMaintainanceRecordService= async (id:number):Promise<boolean>=>{
    await db.delete(MaintainanceRecordTable).where(eq(MaintainanceRecordTable.maintenance_id,id)).returning()
    return true
 }

