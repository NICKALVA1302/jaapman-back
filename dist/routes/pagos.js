"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cobros_1 = require("../controllers/cobros");
const router = (0, express_1.Router)();
router.get('/tipoPago', cobros_1.getTipoPago);
router.post('/PlanillaDet', cobros_1.generarPlanillaDetalle);
router.post('/Pago', cobros_1.realizarAbono);
router.post('/EstadoPago', cobros_1.getEstadoPago);
exports.default = router;
//# sourceMappingURL=pagos.js.map