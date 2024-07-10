import db from "../drizzle/db";
import { VehicleTable, TSVehicle, TIVehicle, VehicleSpecificationTable } from '../drizzle/schema';

import { eq } from "drizzle-orm";

// GET ALL Vehicle
export const getVehicleService = async ()=>{
    return await db.query.VehicleTable.findMany({
        with: {
            vehicleSpecification: true,
        }
    });
}

// GET  Vehicle BY ID
export const getVehicleByIdService = async (id: number) => {
    try {

        const Vehicle = await db.query.VehicleTable.findFirst({
            where: eq(VehicleTable.vehicle_id, id),
            with: {
                vehicleSpecification: {
                    columns: {
                        manufacturer: true,
                        model: true,
                        year: true,
                        engine_capacity: true,
                        fuel_type: true,
                    },
                },
            },
        });

        return Vehicle;
    } catch (error) {
        throw error;
    }
}

// CREATE  Vehicle
export const createVehicleService = async (item: TIVehicle) => {
    await db.insert( VehicleTable).values(item)
    return "vehicle created successfully";
}

//  UPDATE  Vehicle
export const updateVehicleService = async(id: number, res: any): Promise<string | undefined>=> {
    await db.update( VehicleTable).set(res).where(eq( VehicleTable.vehicle_id, id))
    return "vehicle updated successfully";

}
// DELETE  Vehicle
export const deleteVehicleService= async (id:number):Promise<boolean>=>{
    await db.delete( VehicleTable).where(eq( VehicleTable.vehicle_id,id)).returning()
    return true
 }

