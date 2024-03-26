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
exports.putPlanilla_ResponsableLectura = exports.getDatosClienteTomaLectura = exports.getLocalidadxNumPersona = exports.getPlanillas = void 0;
const planillas_1 = __importDefault(require("../models/planillas"));
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection")); // asegúrate de que sea la ruta correcta
//Visualizar planillas
const getPlanillas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planillas = yield planillas_1.default.findAll();
    if (planillas.length > 0) {
        res.json({ planillas });
    }
    else {
        res.status(404).json({
            msg: "No existen planillas registradas",
        });
    }
});
exports.getPlanillas = getPlanillas;
// Se muestran los datos de la localidad y número de personas
const getLocalidadxNumPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuarioRol } = req.params;
    try {
        // Se realiza la consulta por el id_usuario_rol
        const localidadxUser = yield connection_1.default.query(`
        SELECT u.id_localidad, l.nombre, rl.id_usuario_rol,
            COUNT(u.id_persona) as total_personas
        FROM usuario u
            JOIN responsable_lectura rl ON u.id_localidad = rl.id_localidad
            JOIN localidad l ON u.id_localidad = l.id_localidad
        WHERE rl.id_usuario_rol = :usuarioRolId
        GROUP BY u.id_localidad, l.nombre, rl.id_usuario_rol;
        `, {
            replacements: { usuarioRolId: id_usuarioRol },
            type: sequelize_1.QueryTypes.SELECT
        });
        if (localidadxUser.length > 0) {
            // Si existen datos obtenemos los resultados
            res.status(200).json({ resultados: localidadxUser });
        }
        else {
            res.status(200).json({ resultados: [] });
        }
    }
    catch (error) {
        // Si hay un error, se muestra un mensaje
        res.status(500).json({ mensaje: "Error al realizar la consulta" });
    }
});
exports.getLocalidadxNumPersona = getLocalidadxNumPersona;
//Se muestran todos los clientes de una localidad para la toma de lectura
const getDatosClienteTomaLectura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_localidad, id_usuario_rol } = req.params;
    try {
        // Se realiza la consulta por el id_localidad (usuario) y id_usuario_rol (resp_lectura)
        const usuariosLectura = yield connection_1.default.query(`
        SELECT 
            rl.id_localidad, rl.id_responsable_lectura, med.codigo, rl.id_usuario_rol,rl.id_estado as estado_resp, 
            pl.lectura_actual, pl.lectura_anterior, pl.consumo_total, pl.observaciones, pl.estado_lectura , pl.nom_resp_edit as editadoPor,
            per.nombre,per.apellido,u.id_usuario
        FROM usuario u
            JOIN responsable_lectura rl ON u.id_localidad = rl.id_localidad
            JOIN medidor med ON u.id_medidor = med.id_medidor
            JOIN planilla pl ON u.id_usuario = pl.id_usuario
            JOIN persona per ON u.id_persona = per.id_persona
        WHERE u.id_localidad = :localidadId AND rl.id_usuario_rol = :id_usuario_rol;
        `, {
            replacements: { localidadId: id_localidad, id_usuario_rol: id_usuario_rol },
            type: sequelize_1.QueryTypes.SELECT
        });
        if (usuariosLectura.length > 0) {
            // Si existen datos obtenemos los resultados
            res.status(200).json({ resultados: usuariosLectura });
        }
        else {
            res.status(200).json({ resultados: [] });
        }
    }
    catch (error) {
        res.status(500).json({ mensaje: "Error al realizar la consulta" });
    }
});
exports.getDatosClienteTomaLectura = getDatosClienteTomaLectura;
//Se actualiza los datos de lec_actual y anterior del usuario, por parte del operador
const putPlanilla_ResponsableLectura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_responsable_lectura, editadoPor, estado_lectura, observaciones, lectura_actual } = req.body;
    try {
        // Buscar la fila existente por el id_usuario
        const verificarPlanilla = yield planillas_1.default.findOne({
            where: { id_usuario: id_usuario }
        });
        if (verificarPlanilla) {
            const consumo_total = lectura_actual - verificarPlanilla.lectura_anterior;
            // Si la fila existe, se actualizan los campos
            yield verificarPlanilla.update({
                id_responsable_lectura: id_responsable_lectura,
                id_estado_pago: 2,
                observaciones: observaciones,
                consumo_total: consumo_total,
                lectura_actual: lectura_actual,
                estado_lectura: estado_lectura,
                nom_resp_edit: editadoPor
            });
            res.status(200).json({ mensaje: "Datos actualizados" });
        }
        else {
            // Si no existe, da un error
            res.status(404).json({ mensaje: "No se encontró la persona con el ID proporcionado" });
        }
    }
    catch (error) {
        console.error("Error al guardar los datos:", error);
        throw error;
    }
});
exports.putPlanilla_ResponsableLectura = putPlanilla_ResponsableLectura;
//# sourceMappingURL=planillas.js.map