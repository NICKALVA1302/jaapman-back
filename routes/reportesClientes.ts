import { Router } from "express";
import {
  obtenerClientesPorLocalidad,
  obtenerClientesSuspendidos,
} from "../controllers/reportesClientes";
import { obtenerRecudacionAlcantarillado } from "../controllers/reportesTipoRecudacion";

//aqui va todas las rutas de reportes:
// en posmant una ruta deberia verse asi:  http://localhost:3000/api/reporte/getclientesSusp

const router = Router();

// Ruta para obtener datos usuarios suspendidos
router.post("/getclientesSusp", obtenerClientesSuspendidos);

// Ruta para obtener datos usuarios por localidad
router.post("/getclientesLoc", obtenerClientesPorLocalidad);
router.get("/getrecudacionAlca", obtenerRecudacionAlcantarillado);

export default router;
