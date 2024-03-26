import { Request, Response } from 'express';
import TipoPago from '../models/tipo_pago';
import Planillas from '../models/planillas';
import Alcantarillado from '../models/alcantarillado';
import Mantenimiento from '../models/mantenimiento';
import Instalacion from '../models/instalacion';
import PlanillaDetalle from '../models/planillaDetalle';
import Usuarios from '../models/usuarios';
import { Op } from 'sequelize';
import Tarifa from '../models/tarifa';
import Pago from '../models/pago';
import db from '../db/connection';
import Estado_pago from '../models/estado_pago';



// Función para calcular total_pago

export const getTipoPago = async (req: Request, res: Response) => {
    const listTipoPago = await TipoPago.findAll();
    res.json(listTipoPago);

}


/* export const crearRegistrosPlanillaDetalle = async (req: Request, res: Response) => {
    try {
        // Extraer id_usuario del cuerpo de la solicitud
        const { id_usuario } = req.body;

        console.log('ID de usuario recibido:', id_usuario);

        // Obtener información de Mantenimiento, Instalación, Alcantarillado y Planilla según sea necesario
        const mantenimiento = await Mantenimiento.findOne({ where: { id_usuario, id_estado_pago: 2 } });
        const instalacion = await Instalacion.findOne({ where: { id_usuario, id_estado_pago: 2 } });
        const alcantarillado = await Alcantarillado.findOne({ where: { id_usuario, id_estado_pago: 2 } });
        const planilla = await Planillas.findOne({ where: { id_usuario, id_estado_pago: 2 } });

        // Verificar si al menos uno de los servicios tiene id_estado_pago = 2
        if (!(mantenimiento || instalacion || alcantarillado || planilla)) {
            console.error('No se encontraron registros activos con id_estado_pago = 2 para crear el detalle de la planilla.');
            return res.status(404).json({ error: 'No se encontraron registros activos con id_estado_pago = 2 para crear el detalle de la planilla.' });
        }

        // Crear un registro en PlanillaDetalle
        const planillaDetalle = await PlanillaDetalle.create({
            id_usuario,
            id_mantenimiento: mantenimiento ? mantenimiento.getDataValue('id_mantenimiento') : null,
            id_instalacion: instalacion ? instalacion.getDataValue('id_instalacion') : null,
            id_alcantarillado: alcantarillado ?alcantarillado.getDataValue('id_alcantarillado') : null,
            id_planilla: planilla ? planilla.getDataValue('id_planilla') : null,
            id_estado: 1, // Supongo que el id_estado es fijo en 2 para los nuevos registros
            // Agregar otros campos necesarios para el registro en PlanillaDetalle
        });

        console.log('Registro en PlanillaDetalle creado con éxito:', planillaDetalle.toJSON());
        res.status(201).json(planillaDetalle.toJSON());
    } catch (error) {
        console.error('Error al crear el registro en PlanillaDetalle:', error);
        res.status(500).json({ error: 'Se produjo un error al crear el registro en PlanillaDetalle.' });
    }
}; */

export const generarPlanillaDetalle = async (req: Request, res: Response) => {
    const { id_usuario } = req.body;

    try {
        // Verificar si ya existe un detalle de planilla para este usuario este mes
        const fechaActual = new Date();
        const primerDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
        const ultimoDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

        const existeDetalle = await PlanillaDetalle.findOne({
            where: {
                createdAt: {
                    [Op.gte]: primerDiaDelMes,
                    [Op.lt]: ultimoDiaDelMes
                },'$mantenimiento.id_usuario$': id_usuario 
               /*  [Op.and]: [
                    { '$mantenimiento.id_usuario$': id_usuario },
                    {
                        createdAt: {
                            [Op.gte]: primerDiaDelMes,
                            [Op.lt]: ultimoDiaDelMes
                        }
                    }
                ] */
            },
            include: [
                {
                    model: Mantenimiento,
                    where: { id_usuario, id_estado_pago: 2 },
                    required: false // Hacemos que la asociación sea opcional para permitir que el usuario no tenga registros de mantenimiento
                }
            ]
        });

        if (existeDetalle) {
            return res.status(400).json({ mensaje: "Ya se generó un detalle de planilla para este usuario este mes" });
        }

        // Verificar si al menos uno de los servicios tiene un estado de pago igual a 2
        const [mantenimiento, instalacion, alcantarillado, planilla] = await Promise.all([
            Mantenimiento.findOne({ where: { id_usuario, id_estado_pago: 2 } }),
            Instalacion.findOne({ where: { id_usuario, id_estado_pago: 2 } }),
            Alcantarillado.findOne({ where: { id_usuario, id_estado_pago: 2 } }),
            Planillas.findOne({ where: { id_usuario, id_estado_pago: 2 } })
        ]);

        if (!instalacion && !alcantarillado && !planilla) {
            return res.status(400).json({ mensaje: "No se puede crear el detalle de planilla porque uno o más servicios tienen un estado de pago diferente de 2." });
        }

        // Calcular el total a pagar
        let totalPago = 0;
        if (mantenimiento) {
            totalPago += mantenimiento.getDataValue('total');
        }
        if (instalacion) {
            totalPago += instalacion.getDataValue('valor');
        }
        if (alcantarillado) {
            const alcantarilladoInstance = await Alcantarillado.findByPk(alcantarillado.getDataValue('id_alcantarillado'));
            const tarifaAlcantarillado = await Tarifa.findByPk(alcantarilladoInstance.getDataValue('id_tarifa'));
            totalPago += tarifaAlcantarillado.getDataValue('valor');
        }
        if (planilla) {
            totalPago += planilla.getDataValue('total_pagar');
        }

        // Crear el registro en PlanillaDetalle
        const nuevoDetallePlanilla = await PlanillaDetalle.create({
            id_usuario,
            id_planilla: planilla ? planilla.getDataValue('id_planilla') : null,
            id_instalacion: instalacion ? instalacion.getDataValue('id_instalacion') : null,
            id_alcantarillado: alcantarillado ? alcantarillado.getDataValue('id_alcantarillado') : null,
            id_mantenimiento: mantenimiento ? mantenimiento.getDataValue('id_mantenimiento') : null,
            id_estado: 1, // Supongamos que el id_estado es fijo en 1 para los nuevos registros
            total_pago: totalPago,
            descripcion: 'Descripción opcional del detalle de la planilla'
        });

        return res.status(200).json({ mensaje: "Detalle de planilla creado con éxito", nuevoDetallePlanilla });
        
    } catch (error) {
        console.error("Error al generar el detalle de la planilla:", error);
        return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

//REALIZAR PAGOS Y ABONOS
export const realizarAbono = async (req, res) => {
    const { id_planilla_det, id_tipopago, abono_realizado } = req.body;

    try {
        // Verificar si el tipo de pago existe
        const tipoPago = await TipoPago.findByPk(id_tipopago);
        if (!tipoPago) {
            return res.status(400).json({ mensaje: "El tipo de pago especificado no existe" });
        }

        // Registrar el abono en la tabla de pagos
        const nuevoAbono = await Pago.create({
            id_planilla_det,
            id_tipopago,
            abono_realizado
        });

        // Recalcular el valor total abonado
        const pagos = await Pago.findAll({
            where: { id_planilla_det }
        });

        let totalAbonado = 0;
        for (const pago of pagos) {
            totalAbonado += pago.getDataValue('abono_realizado');
        }

        // Actualizar el valor total_pagar en la tabla PlanillaDetalle
        const planillaDet = await PlanillaDetalle.findByPk(id_planilla_det);
        const totalPagarActualizado = planillaDet.getDataValue('total_pago') - totalAbonado;
        await planillaDet.update({ total_pago: totalPagarActualizado });

        // Actualizar el estado de pago y el valor total en los servicios (Mantenimiento, Instalacion, Alcantarillado)
        const servicios = ['Mantenimiento', 'Instalacion', 'Alcantarillado'];
        for (const servicio of servicios) {
            const servicioInstance = await db.models[servicio].findOne({
                where: { id_planilla_det }
            });
            if (servicioInstance) {
                // Actualizar el estado de pago del servicio
                await servicioInstance.update({ id_estado_pago: totalPagarActualizado === 0 ? 1 : 2 });

                // Actualizar el valor total en el servicio si es necesario
                const valorFieldName = servicio === 'Mantenimiento' ? 'total' :
                                       servicio === 'Instalacion' ? 'valor' : 'total_pagar';
                await servicioInstance.update({ [valorFieldName]: totalPagarActualizado });
            }
        }

        // Actualizar el estado de pago en la tabla Planillas y su valor total si es necesario
        const planilla = await Planillas.findOne({
            include: [{ model: PlanillaDetalle, where: { id_planilla_det } }]
        });
        if (planilla) {
            // Actualizar el estado de pago de la planilla
            await planilla.update({
                id_estado_pago: totalPagarActualizado === 0 ? 1 : 2,
                total_pagar: totalPagarActualizado
            });
        }

        return res.status(200).json({ mensaje: "Abono realizado con éxito", nuevoAbono });
    } catch (error) {
        console.error("Error al realizar el abono:", error);
        return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

export const getEstadoPago = async (req: Request, res: Response) => {
    const listEstadoPago = await Estado_pago.findAll();
    res.json(listEstadoPago);

}