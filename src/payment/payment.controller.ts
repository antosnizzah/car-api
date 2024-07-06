import { getPaymentTableByIdService,createPaymentService,deletePaymentService,getPaymentTableService,updatePaymentService } from "./payment.service";
import { getController,createController,deleteController,getAllController,updateController } from "../generics/generics.controller";

const paymentController = getController(getPaymentTableByIdService);

const getAllPaymentsController = getAllController(getPaymentTableService);

const createPaymentController = createController(createPaymentService);

const deletePaymentController = deleteController(getPaymentTableService, deletePaymentService);

const updatePaymentController = updateController(getPaymentTableService, updatePaymentService);

export { paymentController, getAllPaymentsController, createPaymentController, deletePaymentController, updatePaymentController };
