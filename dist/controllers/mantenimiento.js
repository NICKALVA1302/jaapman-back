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
exports.agregarMantenimiento = exports.getLocaxUsuario = exports.getTarifa = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const mantenimiento_1 = __importDefault(require("../models/mantenimiento"));
const mantenimiento_detalle_1 = __importDefault(require("../models/mantenimiento_detalle"));
const material_1 = __importDefault(require("../models/material"));
const sequelize_1 = require("sequelize");
const tarifa_1 = __importDefault(require("../models/tarifa"));
const personas_1 = __importDefault(require("../models/personas"));
const localidades_1 = __importDefault(require("../models/localidades"));
const usuarios_1 = __importDefault(require("../models/usuarios"));
const medidores_1 = __importDefault(require("../models/medidores"));
const getTarifa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listTarifa = yield tarifa_1.default.findAll({
            attributes: [
                'id_tarifa',
                'rango',
                'valor'
            ],
        });
        res.json(listTarifa);
    }
    catch (error) {
        console.error('Error al obtener la lista de tarifa:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getTarifa = getTarifa;
//Obtener datos de localidades por usuario en mantenimiento 
const getLocaxUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_localidad } = req.body;
    try {
        const LocxUsuario = yield personas_1.default.findAll({
            attributes: ["id_persona", "nombre", "apellido", "cedula", "direccion"], // Seleccionar los campos necesarios de la tabla Persona
            include: [
                {
                    model: usuarios_1.default,
                    where: { id_localidad }, // Filtrar por la ID de la localidad
                    include: [
                        {
                            model: localidades_1.default,
                            attributes: ["nombre"] // Seleccionar el nombre de la localidad
                        },
                        {
                            model: medidores_1.default, // Agregar la relación con Medidores
                            attributes: ["id_medidor", "codigo"], // Seleccionar los campos necesarios de Medidores
                            required: true // Cambiar a true si deseas usuarios solo con medidores asignados
                        }
                    ]
                }
            ]
        });
        res.json({
            LocalidadesxUsuario: LocxUsuario,
        });
    }
    catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.getLocaxUsuario = getLocaxUsuario;
// Agregar mantenimiento
const agregarMantenimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id_usuario, id_tarifa, materiales } = req.body;
        // Obtener el valor de la tarifa (o 0 si id_tarifa es null)
        const valorTarifa = id_tarifa
            ? ((_a = (yield tarifa_1.default.findByPk(id_tarifa))) === null || _a === void 0 ? void 0 : _a.getDataValue('valor')) || 0
            : 0;
        const result = yield mantenimiento_1.default.create({
            id_usuario,
            id_tarifa,
            id_estado_pago: 2,
            total: 0
        });
        const id_mantenimiento = result.getDataValue('id_mantenimiento');
        yield connection_1.default.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            for (const { id_material, cantidad } of materiales) {
                const material = yield material_1.default.findByPk(id_material);
                if (!material) {
                    // Manejar el caso donde no se encuentra el material
                    continue;
                }
                const precioMaterial = material.getDataValue('precio');
                const subtotal = cantidad * precioMaterial;
                yield mantenimiento_detalle_1.default.create({
                    id_mantenimiento,
                    id_material,
                    cantidad,
                    subtotal,
                }, { transaction: t });
                // Actualizar el stock del material
                yield material_1.default.update({
                    stock: (0, sequelize_1.literal)(`stock - ${cantidad}`),
                }, {
                    where: { id_material },
                    transaction: t,
                });
            }
            //Actualizar Mantenimiento
            yield mantenimiento_1.default.update({
                total: (0, sequelize_1.literal)(`(SELECT COALESCE(SUM(subtotal), 0) FROM mantenimiento_detalle WHERE id_mantenimiento = ${id_mantenimiento}) + ${valorTarifa}`),
            }, {
                where: { id_mantenimiento },
                transaction: t,
            });
        }));
        res.status(201).json({ msg: 'Materiales Vendidos correctamente' });
    }
    catch (error) {
        console.error('Error al agregar materiales:', error);
        res.status(500).json({ msg: 'Error del servidor al agregar materiales' });
    }
});
exports.agregarMantenimiento = agregarMantenimiento;
//# sourceMappingURL=mantenimiento.js.map