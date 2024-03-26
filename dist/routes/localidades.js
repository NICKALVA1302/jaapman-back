"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const localidades_1 = require("../controllers/localidades");
const router = (0, express_1.Router)();
router.get('/obtencion/localidades', localidades_1.getLocalidades);
router.get('/obtencion/listarLocxUsu', localidades_1.getLocalidadxUsuario);
router.get('/obtencion/localidadesRegister', localidades_1.getLocalidadRegister);
//CAJERO
router.post('/locxUsu', localidades_1.getLocalidadesxUsuario);
exports.default = router;
//# sourceMappingURL=localidades.js.map