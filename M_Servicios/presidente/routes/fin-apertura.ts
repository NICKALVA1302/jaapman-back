import { Router } from "express";

import { getResultTotalLecturas, updateEstadoApertura } from "../controllers/fin-apertura";

const router = Router();

router.get('/getTotalLecturas', getResultTotalLecturas);
router.put('/putEstadoApertura', updateEstadoApertura);

export default router;