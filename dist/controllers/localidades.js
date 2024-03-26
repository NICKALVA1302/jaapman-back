"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalidadesxUsuario = exports.getLocalidadxUsuario = exports.getLocalidadRegister = exports.getLocalidades = void 0;
const localidades_1 = __importDefault(require("../models/localidades"));
const personas_1 = __importDefault(require("../models/personas"));
const usuarios_1 = __importDefault(require("../models/usuarios"));
const instalacion_1 = __importDefault(require("../models/instalacion"));
const medidores_1 = __importDefault(require("../models/medidores"));
const mantenimiento_1 = __importDefault(require("../models/mantenimiento"));
const planillas_1 = __importDefault(require("../models/planillas"));
const planillaDetalle_1 = __importDefault(require("../models/planillaDetalle"));
const alcantarillado_1 = __importDefault(require("../models/alcantarillado"));
const tarifa_1 = __importDefault(require("../models/tarifa"));
const categoria_medidor_1 = __importDefault(require("../models/categoria_medidor"));
//Funcion para mostrar todas las localidades
const getLocalidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const localidades = yield localidades_1.default.findAll();
    if (localidades.length > 0) {
        res.json({ listLocalidad: localidades });
    }
    else {
        res.status(404).json({
            msg: "No existen localidades",
        });
    }
});
exports.getLocalidades = getLocalidades;
const getLocalidadRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listLocalidad = yield localidades_1.default.findAll();
    res.json(listLocalidad);
});
exports.getLocalidadRegister = getLocalidadRegister;
const getLocalidadxUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_localidad } = req.body;
    try {
        const LocxUsuario = yield personas_1.default.findAll({
            attributes: ["id_persona", "nombre"],
            include: [
                {
                    model: usuarios_1.default,
                    where: {
                        id_localidad: id_localidad,
                    },
                    include: [
                        {
                            model: localidades_1.default,
                            attributes: [],
                        },
                    ],
                },
            ],
        });
        res.json({
            LocalidadesxUsuario: LocxUsuario,
        });
    }
    catch (error) {
        console.error("Error al obtener los datos:", error);
        throw error;
    }
});
exports.getLocalidadxUsuario = getLocalidadxUsuario;
//Obtener datos de planilla detalle de localidades por usuario en pantalla cobros
const getLocalidadesxUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_localidad } = req.body;
    try {
        const LocxUsuario = yield personas_1.default.findAll({
            attributes: ["id_persona", "nombre", "apellido", "cedula", "direccion"],
            include: [
                {
                    model: usuarios_1.default,
                    where: { id_localidad },
                    include: [
                        {
                            model: localidades_1.default,
                            attributes: ["nombre"]
                        },
                        {
                            model: medidores_1.default,
                            attributes: ["id_medidor", "codigo"],
                            required: true,
                            include: [
                                {
                                    model: categoria_medidor_1.default,
                                    attributes: ["nombre"]
                                }
                            ]
                        },
                        {
                            model: planillas_1.default,
                            attributes: ["id_planilla", "total_pagar", "lectura_anterior", "lectura_actual", "consumo_total"],
                            include: [
                                {
                                    model: planillaDetalle_1.default,
                                    attributes: ["id_planilla_det", "total_pago", "deuda_pendiente"],
                                    include: [
                                        {
                                            model: alcantarillado_1.default,
                                            attributes: ["id_tarifa"],
                                            include: [
                                                {
                                                    model: tarifa_1.default,
                                                    attributes: ["valor"]
                                                }
                                            ]
                                        },
                                        { model: mantenimiento_1.default, attributes: ["total"] },
                                        { model: instalacion_1.default, attributes: ["valor"] }
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
    }
    catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.getLocalidadesxUsuario = getLocalidadesxUsuario;
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
//# sourceMappingURL=localidades.js.map