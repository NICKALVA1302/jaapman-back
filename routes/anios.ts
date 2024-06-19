import { Router } from "express";
import { getAnios } from "../controllers/anio";

const router = Router();
router.get("/obtencion/anios", getAnios);

export default router;
