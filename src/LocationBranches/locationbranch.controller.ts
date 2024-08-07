import { getLocationBranchesByIdService,createLocationBranchesService,deleteLocationBranchesService,getLocationBranchesService,updateLocationBranchesService } from "./locationbranch.service";
import { getController,createController,deleteController,getAllController,updateController } from "../generics/generics.controller";

const locationBranchesController = getController(getLocationBranchesByIdService);
const getAllLocationBranchesController = getAllController(getLocationBranchesService);
const createLocationBranchesController = createController(createLocationBranchesService);
const deleteLocationBranchesController = deleteController(getLocationBranchesService, deleteLocationBranchesService);
const updateLocationBranchesController = updateController(getLocationBranchesService, updateLocationBranchesService);

export { locationBranchesController, getAllLocationBranchesController, createLocationBranchesController, deleteLocationBranchesController, updateLocationBranchesController };
