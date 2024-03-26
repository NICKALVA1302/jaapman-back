"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const localidades_1 = require("../controllers/localidades");
const router = (0, express_1.Router)();
router.get('/', localidades_1.getLocalidades);
exports.default = router;
//# sourceMappingURL=localidad.js.map