"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const material_1 = require("../controllers/material");
const router = (0, express_1.Router)();
//Controlador de rutas
//Listado de MAteriales
router.get('/mostrarMateriales', material_1.getMaterialxEstado);
//Capturar con id
router.get('/materiales/:id_material', material_1.getMateriales);
//Agregar Material
router.post('/materiales/', material_1.postMaterial);
//Actualizar Material por id
router.put('/materiales/:id_material', material_1.putMaterial);
//Eliminar Material por id
router.delete('/materiales/:id_material', material_1.deleteMaterial);
exports.default = router;
//# sourceMappingURL=materiales.js.map