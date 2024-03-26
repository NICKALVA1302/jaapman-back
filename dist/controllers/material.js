"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMaterial = exports.putMaterial = exports.postMaterial = exports.getMateriales = exports.getMaterialxEstado = void 0;
const material_1 = __importDefault(require("../models/material"));
const connection_1 = __importDefault(require("../db/connection"));
//Api de todo los Materiales
const getMaterialxEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listaMateriales = yield material_1.default.findAll({
            attributes: [
                'id_material',
                [connection_1.default.literal('(SELECT nombre FROM estado WHERE estado.id_estado = material.id_estado)'), 'estado'],
                'nombre',
                'descripcion',
                'stock',
                'precio'
            ],
        });
        res.json(listaMateriales);
    }
    catch (error) {
        console.error('Error al obtener la lista de materiales:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getMaterialxEstado = getMaterialxEstado;
//Buscar por id
const getMateriales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Desestructurar el id
        const { id_material } = req.params;
        // Buscar material por id con asociación al estado
        const material = yield material_1.default.findOne({
            attributes: ['id_material', 'id_estado', 'nombre', 'descripcion', 'stock', 'precio'],
            where: { id_material },
        });
        if (material) {
            res.json(material);
        }
        else {
            res.status(404).json({
                msg: `No existe un Material con el id ${id_material}`,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.getMateriales = getMateriales;
//Agregar Material
const postMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener los datos del material desde el cuerpo de la solicitud
        const { id_estado, nombre, descripcion, stock, precio } = req.body;
        // Crear un nuevo material con el id_estado proporcionado
        const nuevoMaterial = yield material_1.default.create({
            id_estado,
            nombre,
            descripcion,
            stock,
            precio
        });
        // Enviar la respuesta JSON con el nuevo material creado
        res.status(201).json(nuevoMaterial);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.postMaterial = postMaterial;
//Actualizar Material
const putMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Desestrocturar el id
        const { id_material } = req.params;
        const { id_estado, nombre, descripcion, stock, precio } = req.body;
        // Actualizar el material utilizando Sequelize
        const resultado = yield material_1.default.update({
            id_estado,
            nombre,
            descripcion,
            stock,
            precio
        }, {
            where: {
                id_material: id_material,
            },
        });
        if (resultado[0] === 1) {
            res.status(200).json({ msg: 'Material actualizado correctamente' });
        }
        else {
            res.status(404).json({ msg: `Material no encontrado` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.putMaterial = putMaterial;
//Eliminar Material
const deleteMaterial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_material } = req.params;
        // Eliminar el material utilizando Sequelize
        const resultado = yield material_1.default.destroy({
            where: {
                id_material: id_material,
            },
        });
        if (resultado === 1) {
            res.status(200).json({ msg: 'Material eliminado correctamente' });
        }
        else {
            res.status(404).json({ msg: 'Material no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.deleteMaterial = deleteMaterial;
//# sourceMappingURL=material.js.map