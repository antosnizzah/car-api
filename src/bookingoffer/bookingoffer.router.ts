import {createbookingofferController,deletebookingofferController,getbookingByIdController,getbookingofferController,updatebookingofferController } from "./bookingoffer.controller";
import { Hono } from "hono";

export const bookingofferRouter = new Hono();

bookingofferRouter.get("/bookingoffers", getbookingofferController)

bookingofferRouter.get("/bookingoffers/:id", getbookingByIdController)

bookingofferRouter.post("/bookingoffers", createbookingofferController)

bookingofferRouter.put("/bookingoffers/:id", updatebookingofferController)

bookingofferRouter.delete("/bookingoffers/:id", deletebookingofferController)
