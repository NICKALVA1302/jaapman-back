import { Request, Response } from "express";
import db from "../db/connection";

export const obtenerRecudacionAlcantarillado = async (
  req: Request,
  res: Response
) => {
  try {
    const query = `
                SELECT          pe.nombre, 
                                pe.apellido, 
                                rl.fecha, 
                                al.inscrito, 
                                ta.rango, 
                                ta.valor
                FROM          alcantarillado al
                INNER JOIN    planilla_detalle pd ON al.id_alcantarillado = pd.id_alcantarillado
                INNER JOIN    planilla pl ON pd.id_planilla = pl.id_planilla
                INNER JOIN    responsable_lectura rl ON pl.id_responsable_lectura = rl.id_responsable_lectura
                INNER JOIN    tarifa ta ON al.id_tarifa = ta.id_tarifa
                INNER JOIN    usuario us ON al.id_usuario = us.id_usuario AND pl.id_usuario = us.id_usuario
                INNER JOIN    persona pe ON us.id_persona = pe.id_persona;
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
    const query = `
                SELECT      pe.nombre, 
                            pe.apellido, 
                            rl.fecha, 
                            ta.rango, 
                            ta.valor
                FROM          planilla_detalle pd
                INNER JOIN    planilla pl ON pd.id_planilla = pl.id_planilla
                INNER JOIN    responsable_lectura rl ON pl.id_responsable_lectura = rl.id_responsable_lectura
                INNER JOIN    usuario us ON pl.id_usuario = us.id_usuario
                INNER JOIN    persona pe ON us.id_persona = pe.id_persona
                INNER JOIN    mantenimiento ma ON pd.id_mantenimiento = ma.id_mantenimiento AND us.id_usuario = ma.id_usuario
                INNER JOIN    tarifa ta ON ma.id_tarifa = ta.id_tarifa;
          `;
    const [RecudacionMantenimiento] = await db.query(query);
    res.json(RecudacionMantenimiento);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
