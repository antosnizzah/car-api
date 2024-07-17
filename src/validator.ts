import { z } from "zod";


export const userSchema = z.object({
    full_name:z.string(),
    contact_phone:z.string(),
    email:z.string(),
    address:z.string(),
})
export const registerSchema = z.object({
    contact_phone: z.string(),
    email: z.string(),
    address: z.string(),
    username: z.string(),
    password: z.string(),
})

export const bookingSchema = z.object({
    user_id: z.number(),
    vehicle_id: z.number(),
    booking_date: z.date().default(() => new Date()),
    return_date:z.date().default(() => new Date()),
    total_cost: z.number(),
    status: z.string(),
    payment_id: z.string(),
})

export const authorizeSchema = z.object({
    username: z.string(),
    password: z.string(),
})
export const vehiclespecsSchema = z.object({
    manufacturer: z.string(),
    model: z.string(),
    fuel_type: z.string(),
    engine_capacity: z.string(),
    year: z.number(),
    seating_capacity: z.string(),
    color: z.string(),
    transmission:z.string(),
    features:z.string()
})
export const paymentSchema = z.object({
    user_id: z.number(),
    payment_date: z.date().default(()=>new Date()),
    amount: z.number(),
    payment_method: z.string(),
    status: z.string(),
    transaction_id: z.string(),
})
export const vehicleSchema = z.object({
    vehicle_specs_id: z.number(),
    vehicle_number: z.string(),
    vehicle_image: z.string(),
    vehicle_status: z.string(),
    vehicle_location: z.string(),
    vehicle_price: z.number(),
})
export const customerSupportSchema = z.object({
    user_id: z.number(),
    subject: z.string(),
    status: z.string(),
    description: z.string(),
})
export const locationBranchSchema = z.object({
    email: z.string(),
    location_name: z.string(),
    address: z.string(),
    contact_phone: z.string(),
})
export const fleetmanagementSchema= z.object({
    vehicle_id: z.number(),
    vehicle_status: z.string(),
    maintenance_status: z.string(),
    insurance_status: z.string(),

})
export const maintainanceRecschema  = z.object({
    vehicle_id: z.number(),
    maintenance_date: z.date().default(()=>new Date()),
    maintenance_description: z.string(),
    maintenance_cost: z.number(),
})
export const reviewsSchema = z.object({
    user_id: z.number(),
    vehicle_id: z.number(),
    rating: z.number(),
    comment: z.string(),
})
export const promotionalSchema = z.object({
    offer_name: z.string(),
    discount_percentage: z.number(),
    expiry_date: z.date().default(()=>new Date()),
    status: z.string(),
    description: z.string(),
    vehicle_id: z.number(),
    location_id: z.number()

})
export const bookingOfferSchema= z.object({
    vehicle_id: z.number(),
    offer_id:z.number(),
    discount:z.number(),
    status:z.string(),
    booking_id:z.number()
})