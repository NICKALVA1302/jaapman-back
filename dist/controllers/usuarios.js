"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.changePassword = exports.actualizarClave = exports.verificarOTP = exports.guardarOTP = exports.verificarCorreo = exports.obtenerRolesPorUsuario = exports.verificarUsuarioPorToken = exports.buscarToken = exports.verificarCedula = exports.getIdRolUsuario = exports.nuevoUsuario = exports.loginUser = void 0;
const login_1 = require("../models/login");
const usuarios_1 = __importDefault(require("../models/usuarios"));
const usuario_rol_1 = require("../models/usuario_rol");
const bcrypt_1 = __importDefault(require("bcrypt"));
const personas_1 = __importDefault(require("../models/personas"));
const jwt = __importStar(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const rol_1 = require("../models/rol");
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, clave } = req.body;
    try {
        const loginAux = yield login_1.login.findOne({ where: { usuario: usuario } });
        if (!loginAux) {
            return res.status(400).json({
                msg: `No existe un usuario con la cédula ${usuario} en la base de datos`
            });
        }
        const passwordValid = yield bcrypt_1.default.compare(clave, loginAux.clave);
        if (!passwordValid) {
            return res.status(400).json({
                msg: `Clave incorrecta`
            });
        }
        const usuarioAux = yield usuarios_1.default.findOne({ where: { id_login: loginAux.id_login } });
        if (!usuarioAux) {
            return res.status(400).json({
                msg: `No se encontró un usuario asociado a este login`
            });
        }
        if (usuarioAux.id_estado !== 1) {
            return res.status(400).json({
                msg: `Acceso no autorizado. Usuario aún no verificado.`
            });
        }
        const rolesAux = yield usuario_rol_1.usuario_rol.findAll({ where: { id_usuario: usuarioAux.id_usuario } });
        const id_rol_usuario = rolesAux.map((rol) => rol.id_usuario_rol);
        const responseData = {
            msg: 'Inicio de sesión exitoso, Eliga un Rol.',
            token: jwt.sign({
                usuario: usuarioAux.usuario,
            }, process.env.SECRET_KEY || 'manglaraltopda-alvarez'),
            id_usuario: usuarioAux.id_usuario,
            id_rol: rolesAux.map((rol) => rol.id_rol),
            id_rol_usuario: id_rol_usuario
        };
        res.json(responseData);
        console.log(responseData);
    }
    catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.loginUser = loginUser;
const nuevoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, cedula, direccion, telefono, genero, email, clave, id_localidad } = req.body;
    console.log(id_localidad);
    const hashedPassword = yield bcrypt_1.default.hash(clave, 10);
    try {
        yield personas_1.default.create({
            nombre: nombre,
            apellido: apellido,
            cedula: cedula,
            direccion: direccion,
            telefono: telefono,
            genero: genero,
            email: email
        });
        try {
            const ultimaPersona = yield personas_1.default.findOne({
                attributes: ['id_persona'],
                order: [['createdAt', 'DESC']]
            });
            console.log(ultimaPersona);
            const idPersona = ultimaPersona ? ultimaPersona.getDataValue('id_persona') + 0 : 0;
            const randomToken = (0, uuid_1.v4)();
            yield login_1.login.create({
                usuario: cedula,
                clave: hashedPassword,
                token: randomToken,
            });
            try {
                const ultimoLogin = yield login_1.login.findOne({
                    attributes: ['id_login'],
                    order: [['createdAt', 'DESC']]
                });
                console.log(ultimoLogin);
                const idLogin = ultimoLogin ? ultimoLogin.getDataValue('id_login') + 0 : 0;
                const idLocalidad = id_localidad;
                yield usuarios_1.default.create({
                    id_persona: idPersona,
                    id_localidad: idLocalidad,
                    id_estado: 2,
                    id_login: idLogin,
                });
                try {
                    const lastidUser = yield usuarios_1.default.findOne({
                        attributes: ['id_usuario'],
                        order: [['createdAt', 'DESC']]
                    });
                    console.log(lastidUser);
                    const id_usuario = lastidUser ? lastidUser.getDataValue('id_usuario') + 0 : 0;
                    yield usuario_rol_1.usuario_rol.create({
                        id_usuario: id_usuario,
                        id_rol: 1
                    });
                    res.json({
                        msg: 'Usuario creado.'
                    });
                }
                catch (error) {
                    console.error("Error durante la creación:", error);
                    res.status(500).json({
                        error: 'Hubo un error durante la creación del usuario.'
                    });
                }
            }
            catch (error) {
                console.error("Error durante la creación:", error);
                res.status(500).json({
                    error: 'Hubo un error durante la creación del usuario.'
                });
            }
        }
        catch (error) {
            console.error("Error durante la creación:", error);
            res.status(500).json({
                error: 'Hubo un error durante la creación del usuario.'
            });
        }
    }
    catch (error) {
        console.error("Error durante la creación:", error);
        res.status(500).json({
            error: 'Hubo un error durante la creación del usuario.'
        });
    }
});
exports.nuevoUsuario = nuevoUsuario;
const getIdRolUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol } = req.body;
    console.log(id_usuario, id_rol);
    try {
        const usuarioRol = yield usuario_rol_1.usuario_rol.findOne({
            where: {
                id_usuario: id_usuario,
                id_rol: id_rol,
            },
        });
        if (usuarioRol) {
            return res.json({
                success: true,
                id_usuario_rol: usuarioRol.id_usuario_rol,
            });
        }
        else {
            return res.json({
                success: false,
                id_usuario_rol: null,
                message: 'No se encontró un registro de usuario_rol para los valores proporcionados.',
            });
        }
    }
    catch (error) {
        console.error('Error al obtener el id_usuario_rol:', error);
        return res.status(500).json({
            success: false,
            error: 'Error interno del servidor al buscar el id_usuario_rol',
        });
    }
});
exports.getIdRolUsuario = getIdRolUsuario;
const verificarCedula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cedula } = req.body;
    console.log(cedula);
    try {
        const personaExistente = yield personas_1.default.findOne({
            where: {
                cedula: cedula,
            },
        });
        if (personaExistente) {
            return res.json({
                success: true,
                cedulaExists: true,
                persona: {},
            });
        }
        else {
            return res.json({
                success: true,
                cedulaExists: false,
                persona: null,
            });
        }
    }
    catch (error) {
        console.error('Error al verificar la cédula:', error);
        return res.status(500).json({
            success: false,
            error: 'Error interno del servidor',
        });
    }
});
exports.verificarCedula = verificarCedula;
const buscarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario } = req.body;
        if (!usuario) {
            return res.status(400).json({ error: 'El parámetro usuario es requerido' });
        }
        const usuarioLogin = yield login_1.login.findOne({
            attributes: ['token'],
            where: { usuario: usuario },
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({ token: usuarioLogin ? usuarioLogin.token : null });
    }
    catch (error) {
        console.error('Error al buscar el token:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.buscarToken = buscarToken;
const verificarUsuarioPorToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ error: 'El parámetro token es requerido' });
        }
        const loginRegistro = yield login_1.login.findOne({
            where: { token: token },
        });
        if (loginRegistro) {
            const idLogin = loginRegistro.id_login;
            const usuarioActualizado = yield usuarios_1.default.update({ id_estado: 1 }, { where: { id_login: idLogin } });
            if (usuarioActualizado) {
                return res.status(200).json({ mensaje: 'Usuario verificado correctamente' });
            }
            else {
                return res.status(500).json({ error: 'Error al actualizar el usuario' });
            }
        }
        else {
            return res.status(404).json({ error: 'Token no encontrado en la tabla login' });
        }
    }
    catch (error) {
        console.error('Error al verificar el usuario por token:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.verificarUsuarioPorToken = verificarUsuarioPorToken;
const obtenerRolesPorUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUsuario } = req.body;
        if (!idUsuario) {
            return res.status(400).json({ error: 'El parámetro idUsuario es requerido' });
        }
        const rolesIds = yield usuario_rol_1.usuario_rol.findAll({
            attributes: ['id_rol'],
            where: { id_usuario: idUsuario },
            raw: true,
        }).then((roles) => roles.map((r) => r.id_rol));
        const rolesNames = yield rol_1.rol.findAll({
            attributes: ['nombre'],
            where: { id_rol: rolesIds },
            raw: true,
        }).then((roles) => roles.map((r) => r.nombre));
        return res.status(200).json({ roles: rolesNames });
    }
    catch (error) {
        console.error('Error al obtener roles:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.obtenerRolesPorUsuario = obtenerRolesPorUsuario;
const verificarCorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo } = req.body;
    try {
        const personaExistente = yield personas_1.default.findOne({
            where: {
                email: correo,
            },
        });
        if (personaExistente) {
            return res.json({
                success: true,
                correoExists: true,
                persona: {},
            });
        }
        else {
            return res.json({
                success: true,
                correoExists: false,
                persona: null,
            });
        }
    }
    catch (error) {
        console.error('Error al verificar el correo electrónico:', error);
        return res.status(500).json({
            success: false,
            error: 'Error interno del servidor',
        });
    }
});
exports.verificarCorreo = verificarCorreo;
const guardarOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, otp } = req.body;
        if (!correo || !otp) {
            return res.status(400).json({ error: 'Correo y OTP son requeridos' });
        }
        const personaEncontrada = yield personas_1.default.findOne({ where: { email: correo } });
        if (!personaEncontrada) {
            return res.status(404).json({ error: 'No se encontró el usuario asociado al correo proporcionado' });
        }
        const idPersona = personaEncontrada.getDataValue('id_persona');
        const loginEncontrado = yield usuarios_1.default.findOne({ where: { id_persona: idPersona } });
        if (!loginEncontrado) {
            return res.status(404).json({ error: 'No se encontró el registro de Login asociado al usuario' });
        }
        const idLogin = loginEncontrado.getDataValue('id_login');
        yield login_1.login.update({ otp }, { where: { id_login: idLogin } });
        return res.status(200).json({ mensaje: 'OTP guardado con éxito' });
    }
    catch (error) {
        console.error('Error al guardar el OTP:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.guardarOTP = guardarOTP;
const verificarOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    try {
        const loginEncontrado = yield login_1.login.findOne({
            where: {
                otp: otp,
            },
        });
        if (loginEncontrado) {
            const idLogin = loginEncontrado.getDataValue('id_login');
            return res.json({
                success: true,
                otpExists: true,
                id_login: idLogin,
            });
        }
        else {
            return res.json({
                success: true,
                otpExists: false,
                id_login: null,
            });
        }
    }
    catch (error) {
        console.error('Error al verificar el OTP', error);
        return res.status(500).json({
            success: false,
            error: 'Error interno del servidor',
        });
    }
});
exports.verificarOTP = verificarOTP;
const actualizarClave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idLoginFromAuth, nuevaClave } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(nuevaClave, 10);
        const [rowsAffected] = yield login_1.login.update({ clave: hashedPassword }, { where: { id_login: idLoginFromAuth } });
        if (rowsAffected > 0) {
            yield login_1.login.update({ otp: null }, { where: { id_login: idLoginFromAuth } });
            return res.json({ success: true, message: 'Contraseña actualizada con éxito' });
        }
        else {
            return res.status(400).json({ success: false, error: 'No se pudo actualizar la contraseña' });
        }
    }
    catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        return res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
});
exports.actualizarClave = actualizarClave;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol_usuario, id_rol, actualClave, nuevaClave } = req.body;
    try {
        // Se obtiene el id_login del usuario
        const obtenerIdLogin = yield connection_1.default.query(`
        select log.id_login from usuario u 
            join login log on u.id_login = log.id_login
            join usuario_rol ur on u.id_usuario = ur.id_usuario
        where ur.id_usuario_rol = :usuarioRolId and ur.id_rol = :RolId;
        `, {
            replacements: { usuarioRolId: id_rol_usuario, RolId: id_rol },
            type: sequelize_1.QueryTypes.SELECT
        });
        //Se guarda en una variable el id_login
        const id_login = obtenerIdLogin[0].id_login;
        // Primero se busca el id_login del usuario para verificar si la clave actual es correcta
        const loginTable = yield login_1.login.findOne({ where: { id_login: id_login } });
        const passwordValid = yield bcrypt_1.default.compare(actualClave, loginTable.clave);
        if (passwordValid) {
            // Si es correcta, se actualiza la clave
            const hashedPassword = yield bcrypt_1.default.hash(nuevaClave, 10);
            yield loginTable.update({ clave: hashedPassword });
            res.status(200).json({ msg: 'Contraseña actualizada correctamente' });
        }
        else {
            res.status(400).json({ msg: 'La contraseña actual es incorrecta' });
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.changePassword = changePassword;
//# sourceMappingURL=usuarios.js.map