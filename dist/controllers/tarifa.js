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
exports.putTarifa = exports.getTarifa = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const tarifa_1 = __importDefault(require("../models/tarifa"));
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
const putTarifa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_tarifa1, valor1, id_tarifa2, valor2, id_tarifa3, valor3 } = req.body;
        // Iniciar transacción
        yield connection_1.default.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            //Actualizar valores
            yield connection_1.default.query('UPDATE tarifa SET valor = ? WHERE id_tarifa = ?', { replacements: [valor1, id_tarifa1], transaction: t });
            yield connection_1.default.query('UPDATE tarifa SET valor = ? WHERE id_tarifa = ?', { replacements: [valor2, id_tarifa2], transaction: t });
            yield connection_1.default.query('UPDATE tarifa SET valor = ? WHERE id_tarifa = ?', { replacements: [valor3, id_tarifa3], transaction: t });
            //respuesta
            res.status(200).json({ msg: 'Tarifa actualizado correctamente' });
        }));
    }
    catch (error) {
        console.error('Error al actualizar los valores de tarifa:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.putTarifa = putTarifa;
//# sourceMappingURL=tarifa.js.map