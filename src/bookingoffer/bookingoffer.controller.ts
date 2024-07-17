import  {getbookingByIdService,createbookingofferService,deletebookingofferService,getbookingofferService,updatebookingofferService } from "./bookingoffer.service";
import { getController,createController,deleteController,getAllController,updateController } from "../generics/generics.controller";
 
export const getbookingofferController = getAllController(getbookingofferService);

export const getbookingByIdController = getController(getbookingByIdService);
export const createbookingofferController = createController(createbookingofferService);
export const deletebookingofferController = deleteController(getbookingofferService, deletebookingofferService);
export const updatebookingofferController = updateController(getbookingofferService, updatebookingofferService);




