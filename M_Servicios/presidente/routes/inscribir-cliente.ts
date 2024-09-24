import { Router } from "express";
import { inscribirCliente, localidadXUsuAl } from "../controllers/inscribir-cliente";

const router = Router();

//Usuario Localidad y Alcantarillado
router.post("/UsuXAlcantarillado", localidadXUsuAl);

//Inscribir Cliente
router.post("/inscribirCliente", inscribirCliente);

export default router;