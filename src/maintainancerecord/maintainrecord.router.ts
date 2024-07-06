import { Hono } from "hono";
import {createMaintainanceRecordController,deleteMaintainanceRecordController,getAllMaintainanceRecordController,maintainanceRecordController,updateMaintainanceRecordController} from "./maintainrecords.controller";

export const maintainanceRecordsRouter = new Hono();

maintainanceRecordsRouter.get("/maintainanceRecords/:id", maintainanceRecordController);
maintainanceRecordsRouter.post("/maintainanceRecords", createMaintainanceRecordController);

maintainanceRecordsRouter.put("/maintainanceRecords/:id", updateMaintainanceRecordController);

maintainanceRecordsRouter.delete("/maintainanceRecords/:id", deleteMaintainanceRecordController);

maintainanceRecordsRouter.get("/maintainanceRecords", getAllMaintainanceRecordController);


