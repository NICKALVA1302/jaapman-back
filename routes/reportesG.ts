import { Router } from "express";
import {
  obtenerReporteCarteraVA,
  obtenerReporteGeneralCarteraVA,
} from "../controllers/reportesCarteraVA";
import {
  obtenerClientesPorLocalidad,
  obtenerClientesSuspendidos,
} from "../controllers/reportesClientes";
import { obtenerConsumoCliente } from "../controllers/reportesConsumoCliente";
import { obtenerDeudaPueblo } from "../controllers/reportesDeudaPueblo";
import { obtenerLecturaCliente } from "../controllers/reportesLecturaCliente";
import { obtenerPagoCliente } from "../controllers/reportesPagoCliente";
import {
  obtenerRecudacionAlcantarillado,
  obtenerRecudacionMantenimiento,
} from "../controllers/reportesTipoRecudacion";
import { valoresGeneradosXMes } from "../controllers/reportesValoresXMes";
import { obtenerReporteAguaporAnio, obtenerReporteAguaporDia, obtenerReporteAguaporMes } from "../controllers/reportesRecaudacionAgua";
//aqui va todas las rutas de reportes:
// en posmant una ruta deberia verse asi:  http://localhost:3000/api/cajero/getclientesSusp

const router = Router();

// Ruta para obtener datos usuarios suspendidos
router.post("/getclientesSusp", obtenerClientesSuspendidos);

// Ruta para obtener datos usuarios por localidad
router.post("/getclientesLoc", obtenerClientesPorLocalidad);

//ruta para obtener datos de cartera vencida anual
router.post("/getcarteraVA", obtenerReporteCarteraVA);

//ruta para obtener datos generales de Cartera Vencida Anual
router.post("/getGeneralCarteraVA", obtenerReporteGeneralCarteraVA);

//ruta para obtener datos de Consumos Clientes
router.post("/getConsumoCliente", obtenerConsumoCliente);

//ruta para obtener datos de Deuda Pueblo
router.post("/getDeudaPueblo", obtenerDeudaPueblo);

//ruta para obtener datos de Lectura Cliente
router.post("/getLecturaCliente", obtenerLecturaCliente);

//ruta para obtener datos de Pago CLiente
router.post("/getPagoCliente", obtenerPagoCliente);

//ruta para obtener datos Recudacion Por tipo "Alcantarillado"
router.post("/getrecudacionAlca", obtenerRecudacionAlcantarillado);

//ruta para obtener datos Recudacion Por tipo "Alcantarillado"
router.post("/getrecudacionMante", obtenerRecudacionMantenimiento);

//ruta para obtener valores generados por mes
router.post("/GeneradosxMes", valoresGeneradosXMes);

router.post("/recaudacionAguaDia", obtenerReporteAguaporDia);

router.post("/recaudacionAguaMes", obtenerReporteAguaporMes);

router.post("/recaudacionAguaAnio", obtenerReporteAguaporAnio);

export default router;
