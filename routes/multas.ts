import { Router } from "express";
import { actualizarMulta, agregarMulta, eliminarMulta, listadoMultas, obtenerMultaXId } from "../controllers/multas";


const router = Router();

//Listado Multa
router.get('/listMulta', listadoMultas)

//Listado Multa
router.get('/multaXid/:id_multa', obtenerMultaXId)

//Agregar Multa
router.post('/agregarMulta', agregarMulta)

//Eliminar Multa
router.delete('/eliminarMulta/:id_multa', eliminarMulta)

//Actualizar Multa
router.put('/actualizarMulta/:id_multa', actualizarMulta)

export default router;

