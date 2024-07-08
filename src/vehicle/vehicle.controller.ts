import { getVehicleByIdService,createVehicleService,deleteVehicleService,getVehicleService,updateVehicleService } from "../vehicle/vehicle.service";
import { getController,createController,deleteController,getAllController,updateController } from "../generics/generics.controller";

const vehicleController = getController(getVehicleByIdService);

const getAllVehiclesController = getAllController(getVehicleService);

const createVehicleController = createController(createVehicleService);

const deleteVehicleController = deleteController(getVehicleService, deleteVehicleService);

const updateVehicleController = updateController(getVehicleService, updateVehicleService);

export { vehicleController, getAllVehiclesController, createVehicleController, deleteVehicleController, updateVehicleController };