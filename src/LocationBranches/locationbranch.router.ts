import { createLocationBranchesController,deleteLocationBranchesController,getAllLocationBranchesController,locationBranchesController,updateLocationBranchesController } from "./locationbranch.controller";
import { Hono } from "hono";

import { locationBranchSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";

export const locationBranchesRouter = new Hono();

locationBranchesRouter.get("/locationbranches",zValidator('json',locationBranchSchema,(result,c)=>{
    if(!result.success)return c.json(result.error,400)
    }),getAllLocationBranchesController)
locationBranchesRouter.get("/locationbranches/:id", locationBranchesController)
locationBranchesRouter.post("/locationbranches", createLocationBranchesController)
locationBranchesRouter.put("/locationbranches/:id", updateLocationBranchesController)
locationBranchesRouter.delete("/locationbranches/:id", deleteLocationBranchesController)
