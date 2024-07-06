import { z } from "zod";


export const userSchema = z.object({
    full_name:z.string(),
    contact_phone:z.string(),
    email:z.string(),
    address:z.string(),
})

export const bookingSchema = z.object({
    user_id: z.number(),
    vehicle_id: z.number(),
    booking_date: z.date().default(() => new Date()),
    return_date:z.date().default(() => new Date()),
    total_cost: z.number(),
    status: z.string(),
    payment_id: z.string(),
})

export const authorizeSchema = z.object({
    full_name: z.string(),
    password: z.string(),
})