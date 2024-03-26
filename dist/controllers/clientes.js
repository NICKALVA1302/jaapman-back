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
exports.getClientes = void 0;
const clientes_1 = __importDefault(require("../models/clientes"));
//Visualizar usuarios
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield clientes_1.default.findAll();
    if (clientes.length > 0) {
        res.json({ clientes });
    }
    else {
        res.status(404).json({
            msg: 'No existen clientes registrados'
        });
    }
});
exports.getClientes = getClientes;
//# sourceMappingURL=clientes.js.map