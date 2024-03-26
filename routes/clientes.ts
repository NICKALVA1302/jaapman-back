import { Router } from "express";
import { getClientes } from "../controllers/clientes";



const router = Router();
router.get('/', getClientes);


export default router;