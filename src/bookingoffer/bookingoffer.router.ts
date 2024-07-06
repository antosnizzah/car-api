import { bookingController,createBookingController,deleteBookingController,getAllBookingsController,updateBookingController } from "./bookingoffer.controller";
import { Hono } from "hono";

export const bookingofferRouter = new Hono();

bookingofferRouter.get("/bookingoffers", getAllBookingsController)

bookingofferRouter.get("/bookingoffers/:id", bookingController)

bookingofferRouter.post("/bookingoffers", createBookingController)

bookingofferRouter.put("/bookingoffers/:id", updateBookingController)

bookingofferRouter.delete("/bookingoffers/:id", deleteBookingController)
