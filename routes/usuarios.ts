import { Router } from "express";
import { changePassword, nuevoUsuario } from "../controllers/usuarios";



const router = Router();
router.get('/usuario', nuevoUsuario);
router.put('/changePassword', changePassword);


export default router;