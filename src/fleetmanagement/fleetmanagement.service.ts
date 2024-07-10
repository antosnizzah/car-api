import db from "../drizzle/db";
import { FleetManagementTable,TIFleetManagement } from "../drizzle/schema";

import { eq } from "drizzle-orm";



// GET ALL FleetManagement
export const getFleetManagementService = async ()=>{
    return await db.query.FleetManagementTable.findMany();
}

// GET FleetManagement BY ID
export const getFleetManagementByIdService = async (id: number) => {
    const fleetManagement = await db.query.FleetManagementTable.findFirst({
        where: eq(FleetManagementTable.fleet_id, id),
    });
    return fleetManagement;
}

// CREATE FleetManagement
export const createFleetManagementService = async (item: TIFleetManagement) => {
    await db.insert(FleetManagementTable).values(item)
    return "FleetManagement created successfully";
}

//  UPDATE FleetManagement
export const updatebookingService = async(id: number, res: any): Promise<string | undefined>=> {
    await db.update(FleetManagementTable).set(res).where(eq(FleetManagementTable.fleet_id, id))
    return "FleetManagement updated successfully";

}
// DELETE FleetManagement
export const deleteFleetManagementService= async (id:number):Promise<boolean>=>{
    await db.delete(FleetManagementTable).where(eq(FleetManagementTable.fleet_id,id)).returning()
    return true
 }

