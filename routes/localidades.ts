import { Router } from "express";
import { getLocalidadRegister, getLocalidades, getLocalidadesxUsuario, getLocalidadxUsuario } from "../controllers/localidades";



const router = Router();
router.get('/obtencion/localidades', getLocalidades);
router.get('/obtencion/listarLocxUsu', getLocalidadxUsuario);
router.get('/obtencion/localidadesRegister', getLocalidadRegister);

//CAJERO
router.post('/locxUsu',getLocalidadesxUsuario)
export default router;