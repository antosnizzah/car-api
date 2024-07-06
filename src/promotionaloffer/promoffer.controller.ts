import { getPromotionalOffersByIdService,createPromotionalOffersService,deletePromotionalOffersService,getPromotionalOffersService,updatePromotionalOffersService } from "./promoffer.service";
import { getController,createController,deleteController,getAllController,updateController } from "../generics/generics.controller";

const promotionalOffersController = getController(getPromotionalOffersByIdService);

const getAllPromotionalOffersController = getAllController(getPromotionalOffersService);

const createPromotionalOffersController = createController(createPromotionalOffersService);

const deletePromotionalOffersController = deleteController(getPromotionalOffersService, deletePromotionalOffersService);

const updatePromotionalOffersController = updateController(getPromotionalOffersService, updatePromotionalOffersService);

export { promotionalOffersController, getAllPromotionalOffersController, createPromotionalOffersController, deletePromotionalOffersController, updatePromotionalOffersController };
