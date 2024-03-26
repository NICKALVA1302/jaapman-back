import { Router } from 'express';
import { getNombreUsuarioRol, getUsuarioRol } from '../controllers/usuario_rol_controlador';

const router = Router();
router.get('/', getUsuarioRol);
router.get('/obtenerNombreUserRol/:id_usuarioRol', getNombreUsuarioRol);


export default router;