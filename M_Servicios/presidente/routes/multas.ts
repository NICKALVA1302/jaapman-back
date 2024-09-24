import { Router } from "express";
import { actualizarMulta, agregarMulta, eliminarMulta, listadoMultas, obtenerMultaXId, obtenerProximoIdMulta } from "../controllers/multas";


const router = Router();

//Listado Multa
router.get('/listMulta', listadoMultas)

//Proximo numero
router.get('/proxNum', obtenerProximoIdMulta)

//Listado Multa
router.get('/multaXid/:id_multa', obtenerMultaXId)

//Agregar Multa
router.post('/agregarMulta', agregarMulta)

//Eliminar Multa
router.delete('/eliminarMulta/:id_multa', eliminarMulta)

//Actualizar Multa
router.put('/actualizarMulta/:id_multa', actualizarMulta)

export default router;

