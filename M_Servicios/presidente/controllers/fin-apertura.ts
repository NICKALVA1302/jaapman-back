import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import db from "../../../db/connection";
import AperturaLectura from "../../../models/apertura_lectura";

//TODO: Funcion para mostrar el total de lecturas realizadas
export const getResultTotalLecturas = async (req: Request, res: Response) => {
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

//TODO: Funcion para actualizar el estado de la apertura (cierre de apertura)
export const updateEstadoApertura = async (req: Request, res: Response) => {
    const IdaperturaActual:number = await AperturaLectura.max('id_apertura');
    try {
        await AperturaLectura.update(
            { id_estado_apertura: 2 , fecha_fin: new Date()},
            {
                where: {
                    id_apertura : IdaperturaActual,
                },
            }
        );
        res.status(200).json({ mensaje: "Estado de apertura actualizado" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el estado de la apertura" });
    }
};