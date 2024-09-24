import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import Localidades from "../../../models/localidades";
import  db  from '../../../db/connection';
import AperturaLectura from "../../../models/apertura_lectura";



//Funcion para mostrar todas las localidades
export const getLocalidades = async (req: Request, res: Response) => {
    const localidades = await Localidades.findAll();
    if (localidades.length > 0) {
        res.json({ listLocalidad: localidades });
    } else {
        res.status(404).json({
        msg: "No existen localidades",
        });
    }
};


// Se muestran los datos de todos los usuarios por localidad
export const getUsuariosxLocalidad = async (req: Request, res: Response) => {
    const { id_localidad } = req.params;
    try {
        //Primero se verifica la apertura actual por numero mayor de id_apertura
        const aperturaActual:number  = await AperturaLectura.max('id_apertura');

        // Se realiza la consulta por el id_localidad y id_apertura
        const UserxLocalidad = await db.query(`
            
            SELECT 
                med.codigo, cm.nombre AS nombre_categoria, cm.exedente, med.id_estado_medidor,  pl.lectura_actual, pl.lectura_anterior, 
                pl.consumo_total, pl.observaciones, pl.estado_lectura, pl.nom_resp_edit AS editadoPor,
                per.nombre AS nombre_persona,per.apellido AS apellido_persona,per.cedula,u.id_usuario,
                mes.descripcion,total_personas.total AS total_personas_localidad

            FROM usuario u
                JOIN planilla pl ON u.id_usuario = pl.id_usuario
                JOIN persona per ON u.id_persona = per.id_persona
                JOIN apertura_lectura al ON pl.id_apertura = al.id_apertura
                JOIN mes mes ON al.id_mes = mes.id_mes
                JOIN medidor med ON u.id_medidor = med.id_medidor
                JOIN categorias_medidor cm ON med.id_categoria = cm.id_categoria
                JOIN (
                SELECT 
                    u.id_localidad,
                    COUNT(u.id_persona) AS total
                FROM usuario u
                WHERE u.id_localidad = :id_localidad
                GROUP BY u.id_localidad
                ) AS total_personas ON u.id_localidad = total_personas.id_localidad

            WHERE u.id_localidad = :id_localidad AND al.id_apertura = :aperturaActual;
            
            `, {
            replacements: { id_localidad: id_localidad, aperturaActual: aperturaActual},
            type: QueryTypes.SELECT
        });
        if (UserxLocalidad.length > 0) {
            // Si existen datos obtenemos los resultados
            res.status(200).json({ resultados: UserxLocalidad });
        } else {
            
            res.status(200).json({ resultados: [] });
        }
    } catch (error) {
        // Si hay un error, se muestra un mensaje
        res.status(500).json({ mensaje: "Error al realizar la consulta" });
    }
}; 




// Se muestran los datos de un usuario en especifico por apertura
export const getUsuarioxApertura = async (req: Request, res: Response) => {
    const { id_usuario } = req.params;
    try {
        // Se realiza la consulta por el id_localidad y id_apertura
        const UserxApertura = await db.query(`
            
        SELECT 
            al.id_apertura, loc.nombre as localidad ,med.codigo, cm.nombre AS nombre_categoria, cm.exedente, med.id_estado_medidor, pl.lectura_anterior, pl.lectura_actual,
            pl.consumo_total, pl.observacion_presidente, pl.estado_lectura, pl.nom_resp_edit AS editadoPor,
            per.nombre AS nombre_persona,per.apellido AS apellido_persona,per.cedula,u.id_usuario,
            mes.descripcion as nom_mes, anio.descripcion as nom_anio
        FROM usuario u
            JOIN planilla pl ON u.id_usuario = pl.id_usuario
            JOIN localidad loc ON u.id_localidad = loc.id_localidad
            JOIN persona per ON u.id_persona = per.id_persona
            JOIN apertura_lectura al ON pl.id_apertura = al.id_apertura
            JOIN mes mes ON al.id_mes = mes.id_mes
            JOIN anio anio ON al.id_anio = anio.id_anio
            JOIN medidor med ON u.id_medidor = med.id_medidor
            JOIN categorias_medidor cm ON med.id_categoria = cm.id_categoria
        WHERE u.id_usuario = :id_usuario 
        ORDER BY al.id_apertura DESC;
        
        `, {
            replacements: { id_usuario: id_usuario},
            type: QueryTypes.SELECT
        });
        if (UserxApertura.length > 0) {
            // Si existen datos obtenemos los resultados
            res.status(200).json({ resultados: UserxApertura });
        } else {
            
            res.status(200).json({ resultados: [] });
        }
    } catch (error) {
        // Si hay un error, se muestra un mensaje
        res.status(500).json({ mensaje: "Error al realizar la consulta" });
    }
}; 




/* 
//Se actualiza los datos de lec_actual y anterior del usuario, por parte del operador
export const putPlanilla_ResponsableLectura = async (req: Request, res: Response) => {
    const {
        id_usuario,
        id_responsable_lectura, 
        editadoPor,
        estado_lectura,
        observaciones,
        lectura_actual }=req.body;

    try {
        
        // Buscar la fila existente por el id_usuario
        const verificarPlanilla: any = await Planillas.findOne({
            where: { id_usuario: id_usuario }
        });

        if (verificarPlanilla) {
            const consumo_total = lectura_actual - verificarPlanilla.lectura_anterior
            // Si la fila existe, se actualizan los campos
            await verificarPlanilla.update({
                id_responsable_lectura: id_responsable_lectura,
                id_estado_pago:2,
                observaciones:  observaciones,
                consumo_total:  consumo_total,
                lectura_actual: lectura_actual,
                estado_lectura: estado_lectura,
                nom_resp_edit:  editadoPor
            });

            res.status(200).json({ mensaje: "Datos actualizados"});
        } else {
            // Si no existe, da un error
            res.status(404).json({ mensaje: "No se encontró la persona con el ID proporcionado" });
        }
    } catch (error) {
        console.error("Error al guardar los datos:", error);
        throw error;
    }
}; */