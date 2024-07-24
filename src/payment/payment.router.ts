import { Hono } from "hono";
import {createPayments,deletePayments,getPayment,listPayments,updatePayments} from './payment.controller';

export const paymentsRouter = new Hono();
paymentsRouter.get("/payments", listPayments);
paymentsRouter.get("/payments/:id", getPayment);
paymentsRouter.post("/checkout-session", createPayments.createCheckoutSession);
paymentsRouter.put("/payments/:id", updatePayments);
paymentsRouter.delete("/payments/:id", deletePayments);

