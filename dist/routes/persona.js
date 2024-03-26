"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personas_1 = require("../controllers/personas");
const router = (0, express_1.Router)();
router.get('/', personas_1.getPersonas);
exports.default = router;
//# sourceMappingURL=persona.js.map