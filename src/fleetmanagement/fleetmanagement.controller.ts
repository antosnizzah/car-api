import { getFleetManagementByIdService,createFleetManagementService,deleteFleetManagementService,getFleetManagementService,updatebookingService } from "./fleetmanagement.service";
import {getController,createController,deleteController,getAllController,updateController} from "../generics/generics.controller";

const fleetManagementController = getController(getFleetManagementByIdService);
const getAllFleetManagementController = getAllController(getFleetManagementService);
const createFleetManagementController = createController(createFleetManagementService);
const deleteFleetManagementController = deleteController(getFleetManagementService, deleteFleetManagementService);
const updateFleetManagementController = updateController(getFleetManagementService, updatebookingService);

export { fleetManagementController, getAllFleetManagementController, createFleetManagementController, deleteFleetManagementController, updateFleetManagementController };