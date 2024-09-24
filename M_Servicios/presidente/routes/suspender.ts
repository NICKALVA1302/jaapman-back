import { Router } from "express"
import { listadoUsuario, localidadXUsuario, suspenderUsuario } from "../controllers/suspender";


const router = Router();

//Listado de clientes por localidades
router.get('/listadoUsuario', listadoUsuario);

//Listado de clientes por localidades
router.post('/localidadXusuario', localidadXUsuario);

// Suspender un usuario
router.post("/suspenderUsuario", suspenderUsuario);

export default router;