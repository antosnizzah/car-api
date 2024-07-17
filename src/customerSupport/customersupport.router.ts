import { Hono } from "hono";
import { createCustomerSupportTicketsController,deleteCustomerSupportTicketsController,getAllCustomerSupportTicketsController,getCustomerSupportTicketsController,updateCustomerSupportTicketsController } from "./customersupport.controller";
import { customerSupportSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
export const customerSupportRouter = new Hono();

customerSupportRouter.get("/customersupporttickets/:id", getCustomerSupportTicketsController)
customerSupportRouter.post("/customersupporttickets", zValidator('json',customerSupportSchema,(result,c)=>{
 if(!result.success)return c.json(result.error,400)
}),createCustomerSupportTicketsController)

customerSupportRouter.put("/customersupporttickets/:id", updateCustomerSupportTicketsController)

customerSupportRouter.delete("/customersupporttickets/:id", deleteCustomerSupportTicketsController)

customerSupportRouter.get("/customersupporttickets", getAllCustomerSupportTicketsController)
