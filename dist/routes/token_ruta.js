"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.post('/obtencionT/token', usuarios_1.buscarToken);
router.post('/obtencionT/roles', usuarios_1.obtenerRolesPorUsuario);
router.post('/obtencionT/otp', usuarios_1.guardarOTP);
exports.default = router;
//# sourceMappingURL=token_ruta.js.map