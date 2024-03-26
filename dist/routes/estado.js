"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estado_1 = require("../controllers/estado");
const router = (0, express_1.Router)();
//
router.get('/', estado_1.getEstado);
exports.default = router;
//# sourceMappingURL=estado.js.map