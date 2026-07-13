const express = require("express");
const router = express.Router();

const { v4: uuidv4 } = require("uuid");

const solicitudes = require("../data/solicitudes");
const validate = require("../middlewares/validate");

const {
    solicitudSchema,
    updateSchema,
    estadoSchema
} = require("../schemas/solicitud.schema");

// =========================
// Ruta de prueba
// =========================
router.get("/prueba", (req, res) => {
    res.json({
        mensaje: "La ruta funciona correctamente"
    });
});

// =========================
// Crear solicitud
// POST /api/solicitudes
// =========================
router.post(
    "/",
    validate(solicitudSchema),
    (req, res) => {

        const nuevaSolicitud = {
            id: uuidv4(),
            dniCliente: req.body.dniCliente,
            nombreCompleto: req.body.nombreCompleto,
            montoSolicitado: req.body.montoSolicitado,
            plazoMeses: req.body.plazoMeses,
            tasaInteres: req.body.tasaInteres,
            estado: "PENDIENTE",
            fechaCreacion: new Date().toISOString()
        };

        solicitudes.push(nuevaSolicitud);

        res.status(201).json(nuevaSolicitud);
    }
);

module.exports = router;