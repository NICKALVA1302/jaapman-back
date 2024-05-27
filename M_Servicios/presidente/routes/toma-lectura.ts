import { Router } from "express";
import { getLocalidades, getUsuariosxLocalidad, getUsuarioxApertura } from "../controllers/toma-lectura";


const router = Router();
//router.get('/getLocalidades', getLocalidades);
router.get('/getUsuariosxLocalidad/:id_localidad', getUsuariosxLocalidad);
router.get('/getUsuarioxApertura/:id_usuario', getUsuarioxApertura);
//router.put('/actualizarLectura_Planilla', putPlanilla_ResponsableLectura);

export default router;