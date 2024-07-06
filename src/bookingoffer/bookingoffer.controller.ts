import { getbookingByIdService,createbookingService,deletebookingService,getbookingService,updatebookingService } from "../booking/booking.service";
import { getController,createController,deleteController,getAllController,updateController } from "../generics/generics.controller";

const bookingController = getController(getbookingByIdService);

const getAllBookingsController = getAllController(getbookingService);

const createBookingController = createController(createbookingService);

const deleteBookingController = deleteController(getbookingService, deletebookingService);

const updateBookingController = updateController(getbookingService, updatebookingService);

export { bookingController, getAllBookingsController, createBookingController, deleteBookingController, updateBookingController };