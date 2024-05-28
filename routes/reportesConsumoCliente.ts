import { Router } from "express";
import { obtenerConsumoCliente } from "../controllers/reportesConsumoCliente";
//aqui va todas las rutas de reportes:

const router = Router();

router.post("/getConsumoCliente", obtenerConsumoCliente);

export default router;
