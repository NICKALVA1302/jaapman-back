"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_1 = require("./../controllers/usuarios");
const express_1 = require("express");
const usuarios_2 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.get('/', usuarios_2.getUsuarios);
router.get('/:localidadId', usuarios_2.buscarClientesPorLocalidad);
router.get('/usuariopersona/:usuarioId', usuarios_2.obtenerDatosPersonaPorUsuario);
router.get('/localidadusuario/:usuarioId', usuarios_1.obtenerNombreLocalidadUsuario);
router.get('/medidorusuario/:usuarioId', usuarios_1.obtenerMedidorUsuario);
router.get('/usuariocompleto/:usuarioId', usuarios_1.obtenerDatosCompletosPorUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map