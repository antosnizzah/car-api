import { Hono } from "hono";
import { getReviewsRatingController,createReviewsRatingController,deleteReviewsRatingController,getAllReviewsRatingController,updateReviewsRatingController } from "./rating.controller";

export const reviewRouter = new Hono();

reviewRouter.get("/getReviewsRating/:id", getReviewsRatingController);
// by id



