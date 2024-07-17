import { usersController,createUsersController,updateUsersController,deleteUsersController,getAllUsersController} from "./user.controller";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validator";
import { adminRoleAuth } from "../middleware/bearAuth";

export const userRouter = new Hono();

userRouter.get("/users/:id",usersController)
userRouter.post("/users",zValidator('json',userSchema,(result,c)=>{
    if(!result.success) return c.json(result.error,400)
}),createUsersController)
userRouter.put("/users/:id",adminRoleAuth,updateUsersController)

userRouter.delete("/users/:id",adminRoleAuth,deleteUsersController)

userRouter.get("/users",getAllUsersController)
// userRouter.post("/users",createUsersController)