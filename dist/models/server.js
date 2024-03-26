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
const express_1 = __importDefault(require("express"));
const planillas_1 = __importDefault(require("../routes/planillas"));
const usuarios_1 = __importDefault(require("../routes/usuarios"));
const personas_1 = __importDefault(require("../routes/personas"));
const acceso_ruta_1 = __importDefault(require("../routes/acceso_ruta"));
const roles_ruta_1 = __importDefault(require("../routes/roles_ruta"));
const verificacion_ruta_1 = __importDefault(require("../routes/verificacion_ruta"));
const token_ruta_1 = __importDefault(require("../routes/token_ruta"));
const localidades_1 = __importDefault(require("../routes/localidades"));
const actualizacion_ruta_1 = __importDefault(require("../routes/actualizacion_ruta"));
const usuario_rol_1 = __importDefault(require("../routes/usuario_rol"));
const localidades_2 = __importDefault(require("../routes/localidades"));
const pagos_1 = __importDefault(require("../routes/pagos"));
//Materiales
const materiales_1 = __importDefault(require("../routes/materiales"));
const estado_1 = __importDefault(require("../routes/estado"));
//Mantenimientos
const mantenimiento_1 = __importDefault(require("../routes/mantenimiento"));
//Tarifa
const tarifa_1 = __importDefault(require("../routes/tarifa"));
const connection_1 = __importDefault(require("../db/connection")); // Importa la conexión Sequelize
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.apiPaths = {
            operador: '/api/operador',
            presidente: '/api/presidente',
            cliente: '/api/clientes',
            //Crear mas api necesarias
            login: '/api/login',
            cajero: '/api/cajero'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        // definir mis rutas
        this.dbConnection();
        this.middlewares();
        this.routes(); // Agrega el método para configurar las rutas
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate(); // Utiliza la función authenticate de Sequelize para verificar la conexión
                console.log('Connected to database');
            }
            catch (error) {
                console.error('Error al autenticar con la base de datos:', error);
            }
        });
    }
    middlewares() {
        // Cors
        this.app.use((0, cors_1.default)());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta pública
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        //Rutas para login
        this.app.use(this.apiPaths.login, personas_1.default);
        this.app.use(this.apiPaths.login, usuarios_1.default);
        this.app.use(this.apiPaths.login, acceso_ruta_1.default);
        this.app.use(this.apiPaths.login, verificacion_ruta_1.default);
        this.app.use(this.apiPaths.login, token_ruta_1.default);
        this.app.use(this.apiPaths.login, localidades_1.default);
        this.app.use(this.apiPaths.login, actualizacion_ruta_1.default);
        this.app.use(this.apiPaths.login, roles_ruta_1.default);
        //Rutas para clientes
        //Rutas para rol presidente
        //Rutas para rol operadores
        this.app.use(this.apiPaths.operador, planillas_1.default);
        this.app.use(this.apiPaths.operador, usuario_rol_1.default);
        this.app.use(this.apiPaths.operador, usuarios_1.default);
        //Rutas para rol de cajero
        this.app.use(this.apiPaths.cajero, localidades_2.default);
        this.app.use(this.apiPaths.cajero, pagos_1.default);
        //Material
        this.app.use(this.apiPaths.presidente, materiales_1.default);
        this.app.use(this.apiPaths.presidente, estado_1.default);
        //Mantenimiento
        this.app.use(this.apiPaths.presidente, mantenimiento_1.default);
        //Tarifa
        this.app.use(this.apiPaths.presidente, tarifa_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map