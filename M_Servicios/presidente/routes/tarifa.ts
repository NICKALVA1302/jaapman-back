import { Router } from "express"
import { getTarifa, putTarifa } from "../controllers/tarifa"


const router = Router()

//lista de tarifa
router.get('/listTarifa', getTarifa);

//Actualizar la tarifa
router.put('/actualizarTarifa', putTarifa);

export default router;