import { Request, Response } from "express"
import Personas from "../models/personas";
//Visualizar usuarios
export const getPersonas = async (req:Request, res:Response) =>{
    const personas= await Personas.findAll()
    if(personas.length>0){
        res.json({listPersona:personas});
    } else {
        res.status(404).json({
            msg:'No existen personas registradas'
        })
    }
}