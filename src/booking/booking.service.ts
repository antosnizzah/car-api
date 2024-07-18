import db from "../drizzle/db";
import { BookingTable, TIBooking,TSBooking} from '../drizzle/schema';

import { eq } from "drizzle-orm";



// GET ALLBooking 
export const getbookingService = async ()=>{
    return await db.query.BookingTable.findMany({
        columns:{
            user_id:false,
            vehicle_id:false

        },
        with:{
            user:{
                columns:{
                    full_name:true,
                    contact_phone:true,
                    email:true,
                    address:true
                }
            },
            vehicle:{
                columns:{
                    vehicle_id:false,
                    vehicle_specification_id:false
                },
                with:{
                    vehicleSpecification:{
                        columns:{
                            manufacturer:true,
                            model:true,
                            year:true,
                            engine_capacity:true,
                            fuel_type:true,
                            image:true
                        }
                    },
                }
            }
        }
    });
}

// GET Booking BY ID
export const getBookingByIdService = async (id: number) => {
    const booking = await db.query.BookingTable.findFirst({
        where: eq(BookingTable.booking_id, id),
        columns:{
            user_id:false,
            vehicle_id:false
        },
        with:{
            user:{
                columns:{
                    full_name:true,
                    contact_phone:true,
                    email:true,
                    address:true
                }
            },
            vehicle:{
                columns:{
                    vehicle_id:false,
                    vehicle_specification_id:false
                },
                with:{
                    vehicleSpecification:{
                        columns:{
                            manufacturer:true,
                            model:true,
                            year:true,
                            engine_capacity:true,
                            fuel_type:true,
                        }
                    },
                }
            }
        }
    });
    return booking;
}

// CREATE Booking
export const createbookingService = async (item: TIBooking) => {
    try {
        await db.insert(BookingTable).values(item);
        return "booking created successfully";
    } catch (error) {
        console.error('Error creating booking:', error);
        throw new Error('Invalid booking data');
    }
};

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

