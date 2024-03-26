"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.post('/obtener/roles', usuarios_1.obtenerRolesPorUsuario);
router.post('/obtener/rolesxUsuario', usuarios_1.getIdRolUsuario);
exports.default = router;
//# sourceMappingURL=roles_ruta.js.map