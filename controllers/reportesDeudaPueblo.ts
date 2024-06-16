import { Request, Response } from "express";
import db from "../db/connection";

export const obtenerDeudaPueblo = async (req: Request, res: Response) => {
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
                        pl.total_pagar AS deuda_pendiente

                    FROM 
                        localidad lo
                    INNER JOIN 
                        usuario us ON lo.id_localidad = us.id_localidad
                    INNER JOIN 
                        persona pe ON us.id_persona = pe.id_persona
                    INNER JOIN 
                        planilla pl ON us.id_usuario = pl.id_usuario
                    WHERE         pl.total_pagar > 0 
                    AND           lo.nombre ='${localidad}'
                    GROUP BY      
                                  pe.cedula, 
                                  pe.nombre, 
                                  pe.apellido, 
                                  pe.direccion;     

        `;
    const [DeudaPueblo] = await db.query(query);
    res.json(DeudaPueblo);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
