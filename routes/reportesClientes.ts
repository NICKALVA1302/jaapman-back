import { Router } from 'express'
import {obtenerClientesSuspendidos, obtenerClientesPorLocalidad } from '../controllers/reportesClientes';

//aqui va todas las rutas de reportes: 
// en posmant una ruta deberia verse asi:  http://localhost:3000/api/cajero/getclientesSusp

const router = Router();

// Ruta para obtener datos usuarios suspendidos
router.post('/getclientesSusp', obtenerClientesSuspendidos);

// Ruta para obtener datos usuarios por localidad
router.post('/getclientesLoc', obtenerClientesPorLocalidad);

export default router;