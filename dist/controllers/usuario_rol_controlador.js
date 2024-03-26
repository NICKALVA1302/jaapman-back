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
exports.getNombreUsuarioRol = exports.getUsuarioRol = void 0;
const usuario_rol_1 = require("../models/usuario_rol");
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const getUsuarioRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUsarioRol = yield usuario_rol_1.usuario_rol.findAll();
    res.json(listUsarioRol);
});
exports.getUsuarioRol = getUsuarioRol;
const getNombreUsuarioRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuarioRol } = req.params;
    try {
        // Buscar la fila existente por el id_usuario
        const result = yield connection_1.default.query(`
            SELECT CONCAT(per.nombre, ' ', per.apellido) AS fullname
            FROM usuario_rol ur
            JOIN usuario u ON ur.id_usuario = u.id_usuario
            JOIN persona per ON u.id_persona = per.id_persona
            WHERE id_usuario_rol = :id_usuarioRol;
        `, {
            replacements: { id_usuarioRol: id_usuarioRol },
            type: sequelize_1.QueryTypes.SELECT
        });
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ mensaje: "Error al realizar la consulta" });
    }
});
exports.getNombreUsuarioRol = getNombreUsuarioRol;
//# sourceMappingURL=usuario_rol_controlador.js.map