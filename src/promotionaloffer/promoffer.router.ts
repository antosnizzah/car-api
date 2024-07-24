import { Hono } from "hono";
import { promotionalOffersController,createPromotionalOffersController,deletePromotionalOffersController,getAllPromotionalOffersController,updatePromotionalOffersController } from "./promoffer.controller";
import { promotionalSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
export const promofferRouter = new Hono();

promofferRouter.get("/promotions",getAllPromotionalOffersController)
promofferRouter.get("/promotions/:id", promotionalOffersController)
promofferRouter.post("/promotions", createPromotionalOffersController)
promofferRouter.delete("/promotions/:id", deletePromotionalOffersController)
promofferRouter.put("/promotions/:id", updatePromotionalOffersController)