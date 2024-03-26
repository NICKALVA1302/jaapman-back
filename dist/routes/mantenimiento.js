"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mantenimiento_1 = require("../controllers/mantenimiento");
const router = (0, express_1.Router)();
//lista de tarifa
router.get('/tarifa', mantenimiento_1.getTarifa);
//Listado de clientes por localidades
router.post('/usuarioxlocalidad', mantenimiento_1.getLocaxUsuario);
//Mantenimeinto
router.post('/agregarManteniento', mantenimiento_1.agregarMantenimiento);
exports.default = router;
//# sourceMappingURL=mantenimiento.js.map