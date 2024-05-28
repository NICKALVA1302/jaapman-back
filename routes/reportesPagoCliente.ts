import { Router } from "express";
import { obtenerPagoCliente } from "../controllers/reportesPagoCliente";
//aqui va todas las rutas de reportes:

const router = Router();

router.post("/getPagoCliente", obtenerPagoCliente);

export default router;
