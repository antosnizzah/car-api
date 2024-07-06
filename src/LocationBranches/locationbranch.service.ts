import db from "../drizzle/db";
import { LocationBranchesTable,TILocationBranches} from "../drizzle/schema";

import { eq } from "drizzle-orm";



// GET ALLLocationBranches
export const getLocationBranchesService = async ()=>{
    return await db.query.LocationBranchesTable.findMany();
}

// GET LocationBranches BY ID
export const getLocationBranchesByIdService = async (id: number) => {
    const LocationBranches = await db.query.LocationBranchesTable.findFirst({
        where: eq(LocationBranchesTable.location_id, id),
    });
}

// CREATE LocationBranches
export const createLocationBranchesService = async (item: TILocationBranches) => {
    await db.insert(LocationBranchesTable).values(item)
    return "LocationBranches created successfully";
}

//  UPDATELocationBranches
export const updateLocationBranchesService = async(id: number, res: any): Promise<string | undefined>=> {
    await db.update(LocationBranchesTable).set(res).where(eq(LocationBranchesTable.location_id, id))
    return "LocationBranches updated successfully";

}
// DELETELocationBranches
export const deleteLocationBranchesService= async (id:number):Promise<boolean>=>{
    await db.delete(LocationBranchesTable).where(eq(LocationBranchesTable.location_id,id)).returning()
    return true
 }

