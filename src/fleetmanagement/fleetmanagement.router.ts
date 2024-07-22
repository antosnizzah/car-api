import { Hono } from "hono";
import { getAllFleetManagementController,createFleetManagementController,deleteFleetManagementController,fleetManagementController,updateFleetManagementController } from "./fleetmanagement.controller";
import { fleetmanagementSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";

export const fleetManagementRouter = new Hono();

fleetManagementRouter.get("/fleetmanagement",getAllFleetManagementController)
fleetManagementRouter.get("/fleetmanagement/:id", fleetManagementController)
fleetManagementRouter.post("/fleetmanagement", createFleetManagementController)
fleetManagementRouter.put("/fleetmanagement/:id", updateFleetManagementController)
fleetManagementRouter.delete("/fleetmanagement/:id", deleteFleetManagementController)
