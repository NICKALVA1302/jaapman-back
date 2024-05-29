import { Request, Response } from "express";
import { QueryTypes } from 'sequelize';
import  db  from '../../../db/connection';
import Personas from "../../../models/personas";
import Planilla from "../../../models/planillas";
import AperturaLectura from "../../../models/apertura_lectura";


// Se muestran datos de las aperturas de los ciclos realizadas
export const getAperturasCiclos = async (req: Request, res: Response) => {
    try {
        // Se realiza la consulta por el id_usuario_rol
        const aperturasCiclos = await db.query(`
        SELECT 
            al.id_apertura,al.id_estado_apertura, al.id_anio, al.fecha_fin, al.id_mes, al.fecha, mes.descripcion AS mes, anio.descripcion AS anio, 
            al.num_personas, ea.nombre AS estado_apertura
        FROM apertura_lectura al
            JOIN mes mes ON al.id_mes = mes.id_mes
            JOIN anio anio ON al.id_anio = anio.id_anio
            JOIN estado_apertura ea ON al.id_estado_apertura = ea.id_estado_apertura
            ORDER BY al.id_apertura DESC;
        `,
        { type: QueryTypes.SELECT }
        );
        if (aperturasCiclos.length > 0) {
            // Si existen datos obtenemos los resultados
            res.status(200).json({ resultados: aperturasCiclos });
        } else {
            
            res.status(200).json({ resultados: [] });
        }
    } catch (error) {
        // Si hay un error, se muestra un mensaje
        res.status(500).json({ mensaje: "Error al mostrar las aperturas realizadas" });
    }
}



//Se muestran datos del Mes y año siguiente, de la apertura de un nuevo ciclo
export const getAperturaNewCiclo = async (req: Request, res: Response) => {
    
    try {
        // Se realiza la consulta por el id_usuario_rol
        const MesxAnio = await db.query(`
        SELECT m.descripcion AS nombre_mes, a.descripcion AS anio,
        m.id_mes, a.id_anio
        FROM mes m
        CROSS JOIN anio a
        WHERE m.id_mes = (
            SELECT 
                CASE
                    WHEN MONTH(NOW()) < 12 THEN MONTH(NOW())
                    ELSE 1
                END
        )
        AND a.id_anio = (SELECT id_anio FROM anio WHERE descripcion = YEAR(NOW())
        );`,
        { type: QueryTypes.SELECT }
        );
        if (MesxAnio.length > 0) {
            // Si existen datos obtenemos los resultados
            res.status(200).json({ resultados: MesxAnio });
        } else {
            
            res.status(200).json({ resultados: [] });
        }
    } catch (error) {
        // Si hay un error, se muestra un mensaje
        res.status(500).json({ mensaje: "Error al realizar la consulta" });
    }
};


//Se crea una nueva apertura de ciclo
export const postNewApertura = async (req: Request, res: Response) => {
    const { id_mes, id_anio } = req.body;
    try {

        // Se realiza la consulta
        const num_personas = await Personas.count();
        const newApertura = AperturaLectura.build({
            id_mes,
            id_anio,
            id_estado_apertura: 1,
            num_personas: num_personas,
            fecha: new Date()
        });
        // Se guarda la nueva apertura
        await newApertura.save();
        // Obtener usuarios y lecturas actuales de la apertura anterior
        const aperturaActualNew: number = await AperturaLectura.max('id_apertura');        
        
        const planillaAnterior:any = await Planilla.findAll({ where: { id_apertura: aperturaActualNew - 1 }});
        // Se crea nuevas filas en la planilla con los datos duplicados y modificados
        const nuevasFilasPlanilla = planillaAnterior.map((planilla: { id_usuario: any; lectura_actual: any; }) => ({
            id_usuario: planilla.id_usuario,
            id_apertura: aperturaActualNew,
            lectura_anterior: planilla.lectura_actual,
            lectura_actual: 0,
            id_estado: 1,
            id_estado_pago: 2,
            estado_lectura: 2,
        }));
        // Se guarda las nuevas filas en la planilla
        await Planilla.bulkCreate(nuevasFilasPlanilla);
        console.log("Se han insertado las filas en la tabla 'planilla'.");

        res.status(200).json({ mensaje: "Apertura creada con éxito" });

    } catch (error) {
        // Si hay un error, se muestra un mensaje
        res.status(500).json({ mensaje: "Error al crear la apertura!" });
    }
};


