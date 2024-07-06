import { Hono } from "hono";
import { getAllPaymentsController,createPaymentController,deletePaymentController,paymentController,updatePaymentController } from "./payment.controller";

export const paymentRouter = new Hono();
paymentRouter.get("/payment", paymentController)
paymentRouter.post("/payment", createPaymentController)
paymentRouter.delete("/payment/:id", deletePaymentController)
paymentRouter.put("/payment/:id", updatePaymentController)
paymentRouter.get("/payment/:id", getAllPaymentsController)