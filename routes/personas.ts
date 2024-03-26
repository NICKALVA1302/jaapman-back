import { Router } from "express";
import { getPersonas } from "../controllers/personas";



const router = Router();
router.get('/persona', getPersonas);


export default router;