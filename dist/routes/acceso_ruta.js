"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.post('/acceso/login', usuarios_1.loginUser);
router.post('/acceso/usuario', usuarios_1.nuevoUsuario);
exports.default = router;
//# sourceMappingURL=acceso_ruta.js.map