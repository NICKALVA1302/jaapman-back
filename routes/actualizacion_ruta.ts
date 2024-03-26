import { Router } from 'express';
import { actualizarClave } from '../controllers/usuarios';

const router = Router();

router.post('/actualizacion/clave', actualizarClave);


export default router;