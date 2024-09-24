import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import Localidades from "../../../models/localidades";
import db from "../../../db/connection";
import ResponsableLecturas from "../../../models/responsable_lecturas";
import AperturaLectura from "../../../models/apertura_lectura";

//TODO: Funcion para mostrar la apertura actual realizada
export const getAperturaRealizadaActual = async (req: Request, res: Response) => {
    try {
        //Primero se verifica la apertura actual por numero mayor de id_apertura
        const IdaperturaActual:number = await AperturaLectura.max('id_apertura');
        // Se realiza la consulta por el id_usuario_rol
        const aperturaActual = await db.query(`
        SELECT 
            al.id_apertura,al.id_estado_apertura, al.fecha, mes.descripcion AS mes, anio.descripcion AS anio, 
            ea.nombre AS estado_apertura
        FROM apertura_lectura al
            JOIN mes mes ON al.id_mes = mes.id_mes
            JOIN anio anio ON al.id_anio = anio.id_anio
            JOIN estado_apertura ea ON al.id_estado_apertura = ea.id_estado_apertura
        WHERE al.id_apertura = :IdApertura AND al.id_estado_apertura = 1;
        
        `
        , {
            type: QueryTypes.SELECT, replacements: { IdApertura: IdaperturaActual}
        });
        if (aperturaActual.length > 0) {
            // Si existen datos obtenemos los resultados
            res.status(200).json({ resultados: aperturaActual });
        } else {
            res.status(200).json({ resultados: [] });
        }
    } catch (error) {
        // Si hay un error, se muestra un mensaje
        res.status(500).json({ mensaje: "Error al mostrar la apertura actual" });
    }
};

//Funcion para mostrar todas las localidades
export const getLocalidades = async (req: Request, res: Response) => {
    try {
        const localidades = await Localidades.findAll();
        if (localidades.length > 0) {
            res.json({ resultados: localidades });
        } else {
            res.status(200).json({ resultados: [] });
        }
    } catch (error) {
        // Si hay un error, se muestra un mensaje
        res.status(400).json({
            msg: "Error al obtener las localidades",
            error,
        });
    }
};

//TODO: Funcion para mostrar los operadores
export const getOperadores = async (req: Request, res: Response) => {
    const id_usuarioRol = 3;
    try {
        // Se realiza la consulta por el id_usuario_rol
        const Operadores = await db.query(`
            SELECT ur.id_usuario_rol, 
                CONCAT(per.apellido, ' ', per.nombre) AS fullname
            FROM usuario_rol ur
                JOIN usuario u ON ur.id_usuario = u.id_usuario
                JOIN persona per ON u.id_persona = per.id_persona
            WHERE ur.id_rol = :usuarioRolId;
            
            `, {
            replacements: { usuarioRolId: id_usuarioRol },
            type: QueryTypes.SELECT
        });
        if (Operadores.length > 0) {
            // Si existen datos obtenemos los resultados
            res.status(200).json({ resultados: Operadores });
        } else {
            
            res.status(200).json({ resultados: [] });
        }
    } catch (error) {
        // Si hay un error, se muestra un mensaje
        res.status(400).json({
            msg: "Error al obtener los operadores",
            
        });
    }
}; 

// Se muestran los datos del operador y localidad asigandos
export const getOperadorAsignados = async (req: Request, res: Response) => {
    const id_usuarioRol:number = 3;
    try {
        const IdaperturaActual:number = await AperturaLectura.max('id_apertura');
        // Se realiza la consulta por el id_usuario_rol
        const OperadorAsignados = await db.query(`
        SELECT al.id_apertura, ur.id_rol, ur.id_usuario_rol, rl.id_responsable_lectura ,ur.id_usuario, l.id_localidad,
            CONCAT(per.apellido, ' ', per.nombre) AS fullname, l.nombre as localidad ,per.telefono, per.cedula
        FROM usuario_rol ur
            JOIN rol r ON ur.id_rol = r.id_rol
            JOIN usuario u ON ur.id_usuario = u.id_usuario
            JOIN persona per ON u.id_persona = per.id_persona
            JOIN responsable_lectura rl ON ur.id_usuario_rol = rl.id_usuario_rol
            JOIN apertura_lectura al ON rl.id_apertura = al.id_apertura
            JOIN localidad l ON rl.id_localidad = l.id_localidad
        WHERE ur.id_rol = :usuarioRolId AND al.id_apertura = :idApertura;
            
            `, {
            replacements: { usuarioRolId: id_usuarioRol, idApertura: IdaperturaActual},
            type: QueryTypes.SELECT
        });
        if (OperadorAsignados.length > 0) {
            // Si existen datos obtenemos los resultados
            res.status(200).json({ resultados: OperadorAsignados });
        } else {
            
            res.status(200).json({ resultados: [] });
        }
    } catch (error) {
        // Si hay un error, se muestra un mensaje
        res.status(400).json({
            msg: "Error al obtener los operadores Asignados",
            
        });
    }
}; 

//TODO: Funcion para asignar un operador a una localidad
export const postAsignarOperador = async (req: Request, res: Response) => {
    
    const IdaperturaActual:number = await AperturaLectura.max('id_apertura');

    const { id_localidad, id_usuario_rol } = req.body;
    try {
        // Insertar datos con create de sequelize
        const guardarDatos = ResponsableLecturas.build({
            id_localidad: id_localidad,
            id_apertura: IdaperturaActual,
            id_estado: 1,
            id_usuario_rol: id_usuario_rol,
            fecha: new Date()
        });
        await guardarDatos.save();

        res.status(200).json({ resultados: "Datos insertados" });
    } catch (error) {
        // Si hay un error, se muestra un mensaje
        res.status(400).json({
            msg: "Error al insertar al asignar un operador",
            
        });
    }
};
    
//TODO: Funcion para actualizar los datos de un operador asignado
export const putEditOperadorAsig = async (req: Request, res: Response) => {
    const { id_responsable_lectura, id_localidad, id_usuario_rol } = req.body;
    try {
        // Buscar la fila existente por el id_responsable_lectura
        const verificarOperador: any = await ResponsableLecturas.findOne({
            where: { id_responsable_lectura }
        });

        if (verificarOperador) {
            // Si la fila existe, se actualizan los campos
            await verificarOperador.update({
                id_localidad: id_localidad,
                id_usuario_rol: id_usuario_rol,
                fecha: new Date()
            });

            res.status(200).json({ resultados: "Datos actualizados" });
        } else {
            // Si no existe, da un error
            res.status(404).json({ mensaje: "No se encontró la persona con el ID proporcionado" });
        }
    } catch (error) {
        // Si hay un error, se muestra un mensaje
        res.status(400).json({
            msg: "Error al actualizar los datos del operador asignado",
            
        });
    }
};

//TODO: Funcion para eliminar un operador asignado
export const deleteOperadorAsig = async (req: Request, res: Response) => {
    const { id_responsable_lectura } = req.params;
    try {
        // Buscar la fila existente por el id_responsable_lectura
        const verificarOperador = await ResponsableLecturas.findByPk( id_responsable_lectura);

        if (verificarOperador) {
            // Si la fila existe, se elimina
            await verificarOperador.destroy();

            res.status(200).json({ resultados: "Datos eliminados" });
        } else {
            // Si no existe, da un error
            res.status(404).json({ mensaje: "No se encontró la persona con el ID proporcionado" });
        }
    } catch (error) {
        // Si hay un error, se muestra un mensaje
        res.status(400).json({
            msg: "Error al eliminar, es posible que el operador tenga lecturas realizadas",
            
        });
    }
};

