import { Router } from "express";
import { agregarMantenimiento, getLocaxUsuario, getTarifa} from "../controllers/mantenimiento";

const router = Router();

//lista de tarifa
router.get('/tarifa', getTarifa);

//Listado de clientes por localidades
router.post('/usuarioxlocalidad', getLocaxUsuario);

//Mantenimeinto
router.post('/agregarMantenimiento', agregarMantenimiento);

export default router;