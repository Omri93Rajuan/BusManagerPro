import express, { IRouter, Request, Response } from "express";
import {
  addBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
} from "../services/busesService";
import { handleError } from "../../utils/ErrorHandle";

const router: IRouter = express.Router();

// לקבל את כל האוטובוסים
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const buses = await getAllBuses();
    res.json(buses);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

// לקבל אוטובוס לפי ID
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const bus = await getBusById(req.params.id);
    res.json(bus);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

// להוסיף אוטובוס חדש
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const bus = await addBus(req.body);
    res.status(201).json(bus);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

// לעדכן אוטובוס
router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedBus = await updateBus(req.params.id, req.body);
    res.json(updatedBus);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

// למחוק אוטובוס
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deleteBus(req.params.id);
    res.json(result);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

export default router;
