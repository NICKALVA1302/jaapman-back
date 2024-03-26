"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const planillas_1 = require("../controllers/planillas");
const router = (0, express_1.Router)();
router.get('/listarPlanillas', planillas_1.getPlanillas);
router.get('/listarNumPersonasxLoc/:id_usuarioRol', planillas_1.getLocalidadxNumPersona);
router.get('/listarPersonasTomaLectura/:id_localidad/:id_usuario_rol', planillas_1.getDatosClienteTomaLectura);
router.put('/actualizarLectura_Planilla', planillas_1.putPlanilla_ResponsableLectura);
exports.default = router;
//# sourceMappingURL=planillas.js.map