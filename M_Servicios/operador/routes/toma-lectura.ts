import { Router } from "express";
import { getDatosClienteTomaLectura, getLocalidadxNumPersona, getPlanillas, putPlanilla_ResponsableLectura } from "../controllers/toma-lectura";



const router = Router();
router.get('/listarPlanillas', getPlanillas);
router.get('/listarNumPersonasxLoc/:id_usuarioRol', getLocalidadxNumPersona);
router.get('/listarPersonasTomaLectura/:id_localidad/:id_usuario_rol', getDatosClienteTomaLectura);
router.put('/actualizarLectura_Planilla', putPlanilla_ResponsableLectura);

export default router;