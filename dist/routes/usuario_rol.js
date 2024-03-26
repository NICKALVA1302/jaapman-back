"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_rol_controlador_1 = require("../controllers/usuario_rol_controlador");
const router = (0, express_1.Router)();
router.get('/', usuario_rol_controlador_1.getUsuarioRol);
router.get('/obtenerNombreUserRol/:id_usuarioRol', usuario_rol_controlador_1.getNombreUsuarioRol);
exports.default = router;
//# sourceMappingURL=usuario_rol.js.map