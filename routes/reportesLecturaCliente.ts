import { Router } from "express";
import { obtenerDeudaPueblo } from "../controllers/reportesDeudaPueblo";

const router = Router();

router.post("/getLecturaCliente", obtenerDeudaPueblo);

export default router;
