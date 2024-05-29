import { Request, Response } from "express";
import db from "../db/connection";

export const obtenerDeudaPueblo = async (req: Request, res: Response) => {
  try {
    const { localidad } = req.body;
    if (!localidad) {
      return res.status(500).json({ error: "La localidad es requerida" });
    }
    const query = `
                    SELECT          pe.cedula, 
                                    pe.nombre, 
                                    pe.apellido, 
                                    pe.direccion, 
                                    pd.deuda_pendiente, 
                                    SUM(pd.deuda_pendiente) AS total_deuda
                    FROM          localidad lo
                    INNER JOIN    usuario us ON lo.id_localidad = us.id_localidad
                    INNER JOIN    persona pe ON us.id_persona = pe.id_persona
                    INNER JOIN    mantenimiento ma ON us.id_usuario = ma.id_usuario
                    INNER JOIN    mantenimiento_detalle md ON ma.id_mantenimiento = md.id_mantenimiento
                    INNER JOIN    planilla_detalle pd ON md.id_mantenimiento = pd.id_mantenimiento
                    INNER JOIN    alcantarillado al ON pd.id_alcantarillado = al.id_alcantarillado AND al.id_usuario = us.id_usuario
                    INNER JOIN    instalacion ins ON pd.id_instalacion = ins.id_instalacion AND ins.id_usuario = us.id_usuario
                    INNER JOIN    planilla pl ON pd.id_planilla = pl.id_planilla AND pl.id_usuario = us.id_usuario
                    WHERE         pd.deuda_pendiente > 0 
                    AND           lo.nombre ='${localidad}'
                    GROUP BY      pe.cedula, 
                    pe.nombre, 
                    pe.apellido, 
                    pd.deuda_pendiente, 
                    pe.direccion;

        `;
    const [DeudaPueblo] = await db.query(query);
    res.json(DeudaPueblo);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
