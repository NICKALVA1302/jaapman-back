import { Router } from 'express'
import { agregarInstalacion, obtenerUltimoNumeroInstalacion, getLocaxUsuario, getInstalacionesPorUsuario, editarInstalacionPorNumero, borrarInstalacionPorNumero} from '../controllers/instalacion';

const router = Router();

// Ruta para obtener el próximo número de instalación
router.get('/proximonumero', obtenerUltimoNumeroInstalacion);

// Ruta para agregar una nueva instalación
router.post('/agregar', agregarInstalacion);

// Ruta para obtener datos de localidades por usuario en instalación
router.get('/localidades-usuario', getLocaxUsuario);

// Ruta para obtener instalaciones por usuario
router.post('/getInstxUsu', getInstalacionesPorUsuario);

// Ruta para editar una instalación por su número
router.put('/editarInstalacion', editarInstalacionPorNumero);

// Ruta para eliminar una instalación por su numero
router.delete('/eliminarInstalacion/:numero', borrarInstalacionPorNumero);

export default router;