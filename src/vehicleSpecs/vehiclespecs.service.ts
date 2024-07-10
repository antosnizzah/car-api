import db from "../drizzle/db";
import { VehicleSpecificationTable,TIVehicleSpecification } from "../drizzle/schema";

import { eq } from "drizzle-orm";



// GET ALLVehicleSpecification
export const getVehicleSpecificationService = async ()=>{
    return await db.query.VehicleSpecificationTable.findMany();
}

// GET VehicleSpecification BY ID
export const getVehicleSpecificationByIdService = async (id: number) => {
    const vehicleSpecification = await db.query.VehicleSpecificationTable.findFirst({
        where: eq(VehicleSpecificationTable.vehicleSpec_id, id),
    });
    return vehicleSpecification;
}

// CREATE VehicleSpecification
export const createVehicleSpecificationService = async (item: TIVehicleSpecification) => {
    await db.insert(VehicleSpecificationTable).values(item)
    return "VehicleSpecification created successfully";
}

//  UPDATE VehicleSpecification
export const updateVehicleSpecificationService = async(id: number, res: any): Promise<string | undefined>=> {
    await db.update(VehicleSpecificationTable).set(res).where(eq(VehicleSpecificationTable.vehicleSpec_id, id))
    return "VehicleSpecification updated successfully";

}
// DELETE VehicleSpecification
export const deleteVehicleSpecificationService= async (id:number):Promise<boolean>=>{
    await db.delete(VehicleSpecificationTable).where(eq(VehicleSpecificationTable.vehicleSpec_id,id)).returning()
    return true
 }

