import { Hono } from "hono";
import { vehicleController,createVehicleController,deleteVehicleController,getAllVehiclesController,updateVehicleController } from "./vehicle.controller";

export const vehicleRouter= new Hono();

vehicleRouter.get("/vehicles", getAllVehiclesController);

vehicleRouter.get("/vehicles/:id", vehicleController);

vehicleRouter.post("/vehicles", createVehicleController);

vehicleRouter.put("/vehicles/:id", updateVehicleController);

vehicleRouter.delete("/vehicles/:id", deleteVehicleController);

