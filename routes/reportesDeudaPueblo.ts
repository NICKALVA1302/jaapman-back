import { Router } from "express";
import { obtenerLecturaCliente } from "../controllers/reportesLecturaCliente";

const router = Router();

router.post("/getDeudaPueblo", obtenerLecturaCliente);

export default router;
