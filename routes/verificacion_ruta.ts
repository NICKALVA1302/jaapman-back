import { Router } from 'express';
import { 
    verificarCedula, 
    verificarCorreo, 
    verificarOTP, 
    verificarUsuarioPorToken } from '../controllers/usuarios';

const router = Router();

router.post('/verificacion/cedula', verificarCedula)
router.get('/verificacion/activacion', verificarUsuarioPorToken )
router.post('/verificacion/correo', verificarCorreo )
router.post('/verificacion/otp', verificarOTP )


export default router;
