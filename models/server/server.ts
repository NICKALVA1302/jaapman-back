import express, { Application } from 'express';

import planillasRoutes from "../../routes/planillas";

//Presidente
import routesIndexPresidente from '../../M_Servicios/presidente/indexPresidente';

// Operador 
import routesIndexOperador from '../../M_Servicios/operador/indexOperador';

import routesUsuario from '../../routes/usuarios';
import routesPersona from '../../routes/personas';
import routesLogin from '../../routes/acceso_ruta';
import routesRoles from '../../routes/roles_ruta';
import routesVerificacion from '../../routes/verificacion_ruta';
import routesToken from '../../routes/token_ruta';
import routesLocalidad from '../../routes/localidades';
import routesActualizacion from '../../routes/actualizacion_ruta';
import usuario_rolRoutes from '../../routes/usuario_rol';

import routesCobroLocalidad from '../../routes/localidades';
import routesPago from '../../routes/pagos';

//Instalacion
import routesInstalacion from '../../routes/instalacion';

//Reportes
import routesReporte from '../../routes/reportesClientes';


import db from '../../db/connection'; // Importa la conexión Sequelize

import cors from 'cors';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        operador: '/api/operador',
        presidente: '/api/presidente',
        cliente: '/api/clientes',
        //Crear mas api necesarias
        login: '/api/login',
        cajero: '/api/cajero'

    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        // definir mis rutas
        this.listen();
        this.dbConnection();
        this.middlewares();
        this.routes(); // Agrega el método para configurar las rutas
    }

    async dbConnection() {
        try {
            await db.authenticate(); // Utiliza la función authenticate de Sequelize para verificar la conexión
            console.log('Base de datos conectada...');
        } catch (error) {
            console.error('Error al autenticar con la base de datos:', error);
        }
    }

    middlewares() {
        // Cors
        this.app.use(cors());
        // Lectura del body
        this.app.use(express.json());
        // Carpeta pública
        this.app.use(express.static('public'));
    }

    routes() {
        //Rutas para login
        this.app.use(this.apiPaths.login, routesPersona)
        this.app.use(this.apiPaths.login, routesUsuario)
        this.app.use(this.apiPaths.login, routesLogin)
        this.app.use(this.apiPaths.login, routesVerificacion)
        this.app.use(this.apiPaths.login, routesToken)
        this.app.use(this.apiPaths.login, routesLocalidad)
        this.app.use(this.apiPaths.login, routesActualizacion)
        this.app.use(this.apiPaths.login, routesRoles)


        //Rutas para clientes

        //Rutas para rol presidente
        this.app.use(this.apiPaths.presidente, routesIndexPresidente)

        //Rutas para rol operadores
        this.app.use(this.apiPaths.operador, routesIndexOperador)

        //Rutas para rol operadores
        this.app.use(this.apiPaths.operador, planillasRoutes);
        this.app.use(this.apiPaths.operador, usuario_rolRoutes)
        this.app.use(this.apiPaths.operador, routesUsuario)

        //Rutas para rol de cajero
        this.app.use(this.apiPaths.cajero, routesCobroLocalidad)
        this.app.use(this.apiPaths.cajero, routesPago)
        this.app.use(this.apiPaths.cajero, routesInstalacion)
        this.app.use(this.apiPaths.cajero, routesReporte)

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor en el puerto: ' + this.port);
        });
    }
}

export default Server;
