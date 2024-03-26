"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.post('/actualizacion/clave', usuarios_1.actualizarClave);
exports.default = router;
//# sourceMappingURL=actualizacion_ruta.js.map