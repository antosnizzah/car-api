import { getUsersByIdService,getUsersService,updateUsersService,createUsersService,deleteUsersService } from "./user.service";
import { getController,createController,updateController,deleteController,getAllController } from "../generics/generics.controller";

const usersController = getController(getUsersByIdService);

const getAllUsersController = getAllController(getUsersService);

const createUsersController = createController(createUsersService);

const updateUsersController = updateController(getUsersService, updateUsersService);

const deleteUsersController = deleteController(getUsersService, deleteUsersService);

export { usersController, createUsersController, updateUsersController, deleteUsersController,getAllUsersController };
