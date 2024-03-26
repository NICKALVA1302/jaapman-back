import { Request, Response } from "express";
import Localidades from "../models/localidades";
import Personas from "../models/personas";
import Usuarios from "../models/usuarios";
import Instalacion from "../models/instalacion";
import Medidores from "../models/medidores";
import Mantenimiento from "../models/mantenimiento";
import Planillas from "../models/planillas";
import PlanillaDetalle from "../models/planillaDetalle";
import Alcantarillado from "../models/alcantarillado";
import Tarifa from "../models/tarifa";
import categoriaMedidor from "../models/categoria_medidor";
import ResponsableLecturas from "../models/responsable_lecturas";
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
    


export const getLocalidadRegister = async (req: Request, res: Response) => {
    const listLocalidad = await Localidades.findAll();
    res.json(listLocalidad);

}

export const getLocalidadxUsuario = async (req: Request, res: Response) => {
    const { id_localidad } = req.body;
    try {
        const LocxUsuario = await Personas.findAll({
            attributes: ["id_persona", "nombre"],
            include: [
                {
                    model: Usuarios,
                    where: {
                        id_localidad: id_localidad,
                    },
                    include: [
                        {
                            model: Localidades,
                            attributes: [],
                        },
                    ],
                },
            ],
        });

        res.json({
            LocalidadesxUsuario: LocxUsuario,
        });
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        throw error;
    }
};



//Obtener datos de planilla detalle de localidades por usuario en pantalla cobros
export const getLocalidadesxUsuario = async (req: Request, res: Response) => {
    const { id_localidad } = req.body;

    try {
        const LocxUsuario = await Personas.findAll({
            attributes: ["id_persona", "nombre", "apellido", "cedula", "direccion"],
            include: [
                {
                    model: Usuarios,
                    where: { id_localidad },
                    include: [
                        {
                            model: Localidades,
                            attributes: ["nombre"]
                        },
                        {
                            model: Medidores,
                            attributes: ["id_medidor", "codigo"],
                            required: true,
                            include:[
                                {
                                    model: categoriaMedidor,
                                    attributes:["nombre"]
                                }
                            ]
                        },
                        {
                            model: Planillas,
                            attributes: ["id_planilla","total_pagar","lectura_anterior","lectura_actual","consumo_total"],
                            include: [
                                {
                                    model: PlanillaDetalle,
                                    attributes: ["id_planilla_det", "total_pago","deuda_pendiente"],
                                    include: [
                                        {
                                            model: Alcantarillado,
                                            attributes: ["id_tarifa"],
                                            include: [
                                                {
                                                    model: Tarifa,
                                                    attributes: ["valor"]
                                                }
                                            ]
                                        },
                                        { model: Mantenimiento, attributes: ["total"] },
                                        { model: Instalacion, attributes: ["valor"] }
                                    ]
                                },
                                
                            ]
                        }
                    ]
                }

                
            ]
        });
        res.json({
            LocalidadesxUsuario: LocxUsuario,
        });
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

        // Función para calcular total_pago y actualizar el campo total_pago en cada detalle de planilla
     /*    const calcularTotalPagoYActualizar = async (LocxUsuario) => {
            for (const persona of LocxUsuario) {
                for (const usuario of persona.usuarios) {
                    for (const planilla of usuario.planillas) {
                        for (const detalle of planilla.PlanillaDetalles) {
                            const totalPagar = planilla.total_pagar || 0;
                            const alcantarilladoValor = detalle.Alcantarillado?.Tarifa?.valor || 0;
                            const mantenimientoTotal = detalle.Mantenimiento?.total || 0;
                            const instalacionValor = detalle.Instalacion?.valor || 0;

                            const totalPago = totalPagar + alcantarilladoValor + mantenimientoTotal + instalacionValor;
                            detalle.total_pago = totalPago; // Actualizar el campo total_pago

                            // Actualizar el registro en la base de datos
                            await PlanillaDetalle.update({ total_pago: totalPago }, { where: { id_planilla_det: detalle.id_planilla_det } });
                        }
                    }
                }
            }
        };

        // Llamar a la función para calcular total_pago y actualizar el campo total_pago en cada detalle de planilla
        await calcularTotalPagoYActualizar(LocxUsuario); */