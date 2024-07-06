import {bookingController,getAllBookingsController,createBookingController,deleteBookingController,updateBookingController} from "./booking.controller";

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { bookingSchema} from "../validator";

export const bookingRouter = new Hono();

bookingRouter.get("/bookings/:id", bookingController)

bookingRouter.post("/bookings", zValidator('json', bookingSchema,(result,c)=>{
    if(!result.success) return c.json(result.error,400)
}),createBookingController)

bookingRouter.put("/bookings/:id", updateBookingController)

bookingRouter.delete("/bookings/:id", deleteBookingController)

bookingRouter.get("/bookings", getAllBookingsController)

