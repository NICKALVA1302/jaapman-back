import { Router } from "express";
import { 
        deleteOperadorAsig, 
        getAperturaRealizadaActual, 
        getLocalidades, 
        getOperadorAsignados, 
        getOperadores, 
        postAsignarOperador, 
        putEditOperadorAsig,
        
    } from "../controllers/asignar-operador";


const router = Router();
router.get('/getAperturaActual', getAperturaRealizadaActual);
router.get('/getLocalidades', getLocalidades);
router.get('/getOperadores', getOperadores);
router.get('/getOperadoresAsig', getOperadorAsignados);
router.post('/asignarOperador', postAsignarOperador);
router.put('/actualizarOperador', putEditOperadorAsig);
router.delete('/eliminarOperador/:id_responsable_lectura', deleteOperadorAsig);


export default router;