import { Router } from "express";
import { 
    getAperturasCiclos,
    getAperturaNewCiclo,
    postNewApertura
        
    } from "../controllers/inicio-apertura";


const router = Router();
router.get('/getAllAperturas', getAperturasCiclos);
router.get('/getNewApertura', getAperturaNewCiclo);
router.post('/newApertura', postNewApertura);



export default router;
