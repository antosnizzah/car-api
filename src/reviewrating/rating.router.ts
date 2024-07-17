import { Hono } from "hono";
import { getReviewsRatingController,createReviewsRatingController,deleteReviewsRatingController,getAllReviewsRatingController,updateReviewsRatingController } from "./rating.controller";
import { zValidator } from "@hono/zod-validator";
import {reviewsSchema} from '../validator'

export const reviewRouter = new Hono();

reviewRouter.get("/getReviewsRating/:id", getReviewsRatingController);


reviewRouter.get("/getReviewsRating", getAllReviewsRatingController);

reviewRouter.post("/createReviewsRating",zValidator('json',reviewsSchema,(result,c)=>{
    if(!result.success)return c.json(result.error,400)
    }),createReviewsRatingController);

reviewRouter.delete("/deleteReviewsRating/:id", deleteReviewsRatingController);

reviewRouter.put("/updateReviewsRating/:id", updateReviewsRatingController);




