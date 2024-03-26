import { Router } from 'express';
import { buscarToken, guardarOTP, obtenerRolesPorUsuario } from '../controllers/usuarios';

const router = Router();

router.post('/obtencionT/token', buscarToken);
router.post('/obtencionT/roles', obtenerRolesPorUsuario);
router.post('/obtencionT/otp', guardarOTP);


export default router;