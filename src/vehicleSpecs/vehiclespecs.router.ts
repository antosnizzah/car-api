import { Hono } from "hono";
import { vehicleSpecificationController,createVehicleSpecificationController,deleteVehicleSpecificationController,getAllVehicleSpecificationsController,updateVehicleSpecificationController } from "./vehiclespecs.controller";
export const vehicleSpecsRouter= new Hono();

vehicleSpecsRouter.get("/vehiclespecifications",getAllVehicleSpecificationsController);

vehicleSpecsRouter.get("/vehiclespecifications/:id",vehicleSpecificationController);

vehicleSpecsRouter.post("/vehiclespecifications",createVehicleSpecificationController);

vehicleSpecsRouter.put("/vehiclespecifications/:id",updateVehicleSpecificationController);

vehicleSpecsRouter.delete("/vehiclespecifications/:id",deleteVehicleSpecificationController);
