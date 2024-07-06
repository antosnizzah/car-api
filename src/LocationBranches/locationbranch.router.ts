import { createLocationBranchesController,deleteLocationBranchesController,getAllLocationBranchesController,locationBranchesController,updateLocationBranchesController } from "./locationbranch.controller";
import { Hono } from "hono";

export const locationBranchesRouter = new Hono();

locationBranchesRouter.get("/locationbranches", getAllLocationBranchesController)
locationBranchesRouter.get("/locationbranches/:id", locationBranchesController)
locationBranchesRouter.post("/locationbranches", createLocationBranchesController)
locationBranchesRouter.put("/locationbranches/:id", updateLocationBranchesController)
locationBranchesRouter.delete("/locationbranches/:id", deleteLocationBranchesController)
