import { getbookingService,getBookingByIdService,createbookingService,deletebookingService,updatebookingService, } from "./booking.service";
import { getController,createController,deleteController,getAllController,updateController } from "../generics/generics.controller";

export const bookingController = getController(getBookingByIdService);

export const getAllBookingsController = getAllController(getbookingService);

export const createBookingController = createController(createbookingService);

export const deleteBookingController = deleteController(getbookingService, deletebookingService);

export const updateBookingController = updateController(getbookingService, updatebookingService);
