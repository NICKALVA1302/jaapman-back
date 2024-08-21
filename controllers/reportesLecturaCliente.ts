import { Request, Response } from "express";
import db from "../db/connection";

export const obtenerLecturaCliente = async (req: Request, res: Response) => {
  try {
    const { cedula, fecha } = req.body;
    if (!cedula) {
      return res.status(500).json({ error: "La cédula es requerida" });
    }
    // if (!localidad) {
    //   return res.status(500).json({ error: "La localidad es requerida" });
    // }
    if (!fecha) {
      return res.status(500).json({ error: "La fecha es requerida" });
    }
    await db.query("SET lc_time_names = 'es_ES';");

    const query = `
            SELECT 
                persona.cedula AS 'PersonaCedula',
                persona.nombre AS 'PersonaNombre',
                persona.apellido AS 'PersonaApellido',
                persona.direccion AS 'PersonaDireccion',
                persona.telefono AS 'PersonaTelefono',
                DATE_FORMAT(planilla.createdAt, '%M') AS 'Mes',
                YEAR(planilla.createdAt) AS 'Año', 
                planilla.lectura_anterior AS 'Anterior', 
                planilla.lectura_actual AS 'Actual', 
                planilla.consumo_total AS 'Consumo',
                estado_pago.nombre AS 'Estado', 
                planilla.total_pagar AS 'Saldo'
            FROM 
                planilla
            INNER JOIN 
                usuario ON usuario.id_usuario = planilla.id_usuario
            INNER JOIN 
                persona ON persona.id_persona =  usuario.id_persona
            INNER JOIN 
                estado_pago ON estado_pago.id_estado_pago = planilla.id_estado_pago
            WHERE 
                
                YEAR(planilla.createdAt)  = ${fecha} AND
                persona.cedula = '${cedula}';
            `;
    // localidad.nombre = '${localidad}' AND
    const [LecturaCliente] = await db.query(query);
    res.json(LecturaCliente);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
