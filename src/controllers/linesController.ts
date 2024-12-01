import express, { IRouter, Request, Response } from "express";
import {
  addLine,
  getAllLines,
  getLineById,
  updateLine,
  deleteLine,
} from "../services/linesService";
import { handleError } from "../../utils/ErrorHandle";

const router: IRouter = express.Router();

// לקבל את כל הנתיבים
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const lines = await getAllLines();
    res.json(lines);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

// לקבל נתיב לפי ID
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const line = await getLineById(req.params.id);
    res.json(line);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

// להוסיף נתיב חדש
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const line = await addLine(req.body);
    res.status(201).json(line);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

// לעדכן נתיב
router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedLine = await updateLine(req.params.id, req.body);
    res.json(updatedLine);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

// למחוק נתיב
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deleteLine(req.params.id);
    res.json(result);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

export default router;
