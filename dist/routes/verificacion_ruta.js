"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.post('/verificacion/cedula', usuarios_1.verificarCedula);
router.get('/verificacion/activacion', usuarios_1.verificarUsuarioPorToken);
router.post('/verificacion/correo', usuarios_1.verificarCorreo);
router.post('/verificacion/otp', usuarios_1.verificarOTP);
exports.default = router;
//# sourceMappingURL=verificacion_ruta.js.map