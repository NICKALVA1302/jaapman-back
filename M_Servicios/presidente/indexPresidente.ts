import routesAsignOperador from './routes/asignar-operador'; 
import routesInicioApertura from './routes/inicio-apertura'; 
import routesFinApertura from './routes/fin-apertura'; 
import routesMateriales from './routes/materiales'
// import routesEstado from './routes/estado'
import routesMantenimiento from './routes/mantenimiento'
import routesTarifa from './routes/tarifa'
import routesTomaLecturas from './routes/toma-lectura'
import routesMulta from './routes/multas'
import routesSuspender from './routes/suspender'

import { Router } from 'express';


const router = Router();

//Toma de lectura
router.use(routesTomaLecturas);
//Asignar operador
router.use(routesAsignOperador);
//Inicio de apertura
router.use(routesInicioApertura);
//Cierre de apertura
router.use(routesFinApertura);


//Materiales
router.use(routesMateriales);
//Mantenimientos
router.use(routesMantenimiento);
//Tarifa
router.use(routesTarifa);
//Multas
router.use(routesMulta);
//Suspender
router.use(routesSuspender);


export default router;
