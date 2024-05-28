import { Router } from "express";
import {
  obtenerRecudacionAlcantarillado,
  obtenerRecudacionMantenimiento,
} from "../controllers/reportesTipoRecudacion";
//aqui va todas las rutas de reportes:
// en posmant una ruta deberia verse asi:  http://localhost:3000/api/cajero/getrecudacionAlca
const router = Router();

router.get("/getrecudacionAlca", obtenerRecudacionAlcantarillado);
router.get("/getrecudacionMante", obtenerRecudacionMantenimiento);

export default router;
