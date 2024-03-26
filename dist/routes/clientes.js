"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_1 = require("../controllers/clientes");
const router = (0, express_1.Router)();
router.get('/', clientes_1.getClientes);
exports.default = router;
//# sourceMappingURL=clientes.js.map