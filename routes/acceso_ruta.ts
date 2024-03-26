import { Router } from 'express';
import { loginUser, nuevoUsuario, verificarCedula } from '../controllers/usuarios';

const router = Router();

router.post('/acceso/login', loginUser);
router.post('/acceso/usuario', nuevoUsuario);


export default router;