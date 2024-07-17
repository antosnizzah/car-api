import {createbookingofferController,deletebookingofferController,getbookingByIdController,getbookingofferController,updatebookingofferController } from "./bookingoffer.controller";
import { Hono } from "hono";
import {bookingOfferSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";

export const bookingofferRouter = new Hono();

bookingofferRouter.get("/bookingoffers", getbookingofferController)

bookingofferRouter.get("/bookingoffers/:id", getbookingByIdController)

bookingofferRouter.post("/bookingoffers",zValidator('json',bookingOfferSchema,(result,c)=>{
    if(!result.success)return c.json(result.error,400)
    }),createbookingofferController)

bookingofferRouter.put("/bookingoffers/:id", updatebookingofferController)

bookingofferRouter.delete("/bookingoffers/:id", deletebookingofferController)
