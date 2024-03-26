import { Router } from "express";
import { generarPlanillaDetalle, getEstadoPago, getTipoPago, realizarAbono } from "../controllers/cobros";

const router = Router();

router.get('/tipoPago',getTipoPago)

router.post('/PlanillaDet', generarPlanillaDetalle);

router.post('/Pago', realizarAbono);

router.post('/EstadoPago', getEstadoPago);


export default router;