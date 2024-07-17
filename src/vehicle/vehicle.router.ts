import { Hono } from "hono";
import { vehicleController,createVehicleController,deleteVehicleController,getAllVehiclesController,updateVehicleController } from "./vehicle.controller";
import { vehicleSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";
export const vehicleRouter= new Hono();

vehicleRouter.get("/vehicles",getAllVehiclesController);

vehicleRouter.get("/vehicles/:id", vehicleController);

vehicleRouter.post("/vehicles",zValidator('json',vehicleSchema,(result,c)=>{
    if(!result.success) return c.json(result.error,400)
    }),createVehicleController);

vehicleRouter.put("/vehicles/:id", updateVehicleController);

vehicleRouter.delete("/vehicles/:id", deleteVehicleController);

