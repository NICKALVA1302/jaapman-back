"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tarifa_1 = require("../controllers/tarifa");
const router = (0, express_1.Router)();
//lista de tarifa
router.get('/listTarifa', tarifa_1.getTarifa);
//Actualizar la tarifa
router.put('/actualizarTarifa', tarifa_1.putTarifa);
exports.default = router;
//# sourceMappingURL=tarifa.js.map