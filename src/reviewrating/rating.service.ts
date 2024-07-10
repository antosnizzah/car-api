import db from "../drizzle/db";
import { ReviewsRatingTable,TIRatingsReviews} from "../drizzle/schema";

import { eq } from "drizzle-orm";



// GET ALL ReviewsRating
export const getReviewsRatingService = async ()=>{
    return await db.query.ReviewsRatingTable.findMany();
}

// GET ReviewsRating BY ID
export const getReviewsRatingByIdService = async (id: number) => {
    try {
        const ReviewsRating = await db.query.ReviewsRatingTable.findFirst({
            where: eq(ReviewsRatingTable.review_id, id),
        });

        return ReviewsRating;
    } catch (error) {
        throw error;
    }
}

// CREATE ReviewsRating
export const createReviewsRatingService = async (item: TIRatingsReviews) => {
    await db.insert(ReviewsRatingTable).values(item)
    return "ReviewsRating created successfully";
}

//  UPDATE ReviewsRating
export const updateReviewsRatingService = async(id: number, res: any): Promise<string | undefined>=> {
    await db.update(ReviewsRatingTable).set(res).where(eq(ReviewsRatingTable.review_id, id))
    return "ReviewsRating updated successfully";

}
// DELETE ReviewsRating
export const deleteReviewsRatingService= async (id:number):Promise<boolean>=>{
    await db.delete(ReviewsRatingTable).where(eq(ReviewsRatingTable.review_id,id)).returning()
    return true
 }

