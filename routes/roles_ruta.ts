import { Router } from 'express';
import { getIdRolUsuario, obtenerRolesPorUsuario } from '../controllers/usuarios';

const router = Router();

router.post('/obtener/roles', obtenerRolesPorUsuario);
router.post('/obtener/rolesxUsuario', getIdRolUsuario);


export default router;
