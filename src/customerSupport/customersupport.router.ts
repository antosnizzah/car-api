import { Hono } from "hono";
import { createCustomerSupportTicketsController,deleteCustomerSupportTicketsController,getAllCustomerSupportTicketsController,getCustomerSupportTicketsController,updateCustomerSupportTicketsController } from "./customersupport.controller";
 
export const customerSupportRouter = new Hono();

customerSupportRouter.get("/customersupporttickets/:id", getCustomerSupportTicketsController)
customerSupportRouter.post("/customersupporttickets", createCustomerSupportTicketsController)

customerSupportRouter.put("/customersupporttickets/:id", updateCustomerSupportTicketsController)

customerSupportRouter.delete("/customersupporttickets/:id", deleteCustomerSupportTicketsController)

customerSupportRouter.get("/customersupporttickets", getAllCustomerSupportTicketsController)
