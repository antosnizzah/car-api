import { getController,createController,deleteController,getAllController,updateController } from "../generics/generics.controller";
import { getReviewsRatingByIdService,createReviewsRatingService,deleteReviewsRatingService,getReviewsRatingService,updateReviewsRatingService } from "./rating.service";

export const getReviewsRatingController = getController(getReviewsRatingByIdService);

export const getAllReviewsRatingController = getAllController(getReviewsRatingService);

export const createReviewsRatingController = createController(createReviewsRatingService);

export const deleteReviewsRatingController = deleteController(getReviewsRatingService, deleteReviewsRatingService);


export const updateReviewsRatingController = updateController(getReviewsRatingService, updateReviewsRatingService);
