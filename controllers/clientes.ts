import { Request, Response } from "express"
import Cliente from "../models/clientes";
//Visualizar usuarios
export const getClientes = async (req:Request, res:Response) =>{
    const clientes= await Cliente.findAll()
    if(clientes.length>0){
        res.json({clientes});
    } else {
        res.status(404).json({
            msg:'No existen clientes registrados'
        })
    }
}