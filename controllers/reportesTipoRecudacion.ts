import { Request, Response } from "express";
import db from "../db/connection";

export const obtenerRecudacionAlcantarillado = async (
  req: Request,
  res: Response
) => {
  try {
    const { localidad } = req.body;
    if (!localidad) {
      return res.status(500).json({ error: "La localidad es requerida" });
    }
    const query = `
                  SELECT          
                                  pe.cedula,
                                                  pe.nombre, 
                                                  pe.apellido, 
                                                  pe.direccion,
                                                  al.createdAt, 
                                                  al.inscrito,
                                                  ep.nombre AS 'Estado'
                                  FROM          alcantarillado al
                                  INNER JOIN    usuario us ON al.id_usuario = us.id_usuario 
                                  INNER JOIN    persona pe ON us.id_persona = pe.id_persona
                                  INNER JOIN    localidad lo ON us.id_localidad = lo.id_localidad
                          INNER JOIN    estado_pago ep ON al.id_estado_pago = ep.id_estado_pago
                WHERE         lo.nombre ='${localidad}'
        `;
    const [RecudacionAlcantarillado] = await db.query(query);
    res.json(RecudacionAlcantarillado);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const obtenerRecudacionMantenimiento = async (
  req: Request,
  res: Response
) => {
  try {
    const { localidad } = req.body;
    if (!localidad) {
      return res.status(500).json({ error: "La localidad es requerida" });
    }
    const query = `
                SELECT      
                      pe.cedula,
                      pe.nombre, 
                      pe.apellido,
                      ma.total,
                      ma.createdAt,
                      lo.nombre AS 'localidad',
                      pe.direccion
                From
                            Mantenimiento ma
                INNER JOIN usuario us ON ma.id_usuario = us.id_usuario
                INNER JOIN persona pe ON us.id_persona = pe.id_persona
                INNER JOIN localidad lo ON us.id_localidad = lo.id_localidad
                WHERE         lo.nombre ='${localidad}'
          `;
    const [RecudacionMantenimiento] = await db.query(query);
    res.json(RecudacionMantenimiento);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
