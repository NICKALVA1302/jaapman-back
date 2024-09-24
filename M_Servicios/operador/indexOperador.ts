import { Router } from 'express';
import tomaLecturaRoutes from "./routes/toma-lectura";
import routesUsuario from '../../routes/usuarios'; 
import usuario_rolRoutes from '../../routes/usuario_rol'; 


const router = Router();

router.use(tomaLecturaRoutes);
router.use(usuario_rolRoutes)
router.use(routesUsuario)

export default router;