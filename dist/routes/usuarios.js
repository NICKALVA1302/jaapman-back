"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.get('/usuario', usuarios_1.nuevoUsuario);
router.put('/changePassword', usuarios_1.changePassword);
exports.default = router;
//# sourceMappingURL=usuarios.js.map