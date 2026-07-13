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


// ==========================
// GET /api/solicitudes
// ==========================
router.get("/", (req, res) => {
    res.json(solicitudes);
})

// ==========================
// GET /api/solicitudes/:id
// ==========================
router.get("/:id", (req, res) => {

    const solicitud = solicitudes.find(
        s => s.id === req.params.id
    );

    if (!solicitud) {
        return res.status(404).json({
            mensaje: "Solicitud no encontrada"
        });
    }

    res.json(solicitud);
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


// ==========================
// PUT /api/solicitudes/:id
// ==========================
router.put(
    "/:id",
    validate(updateSchema),
    (req, res) => {

        const solicitud = solicitudes.find(
            s => s.id === req.params.id
        );

        if (!solicitud) {
            return res.status(404).json({
                mensaje: "Solicitud no encontrada"
            });
        }

        if (solicitud.estado !== "PENDIENTE") {
            return res.status(400).json({
                mensaje: "Solo se pueden actualizar solicitudes pendientes"
            });
        }

        solicitud.nombreCompleto = req.body.nombreCompleto ?? solicitud.nombreCompleto;
        solicitud.montoSolicitado = req.body.montoSolicitado ?? solicitud.montoSolicitado;
        solicitud.plazoMeses = req.body.plazoMeses ?? solicitud.plazoMeses;

        res.json(solicitud);
    }
);

// ==========================
// PATCH /api/solicitudes/:id/estado
// ==========================
router.patch(
    "/:id/estado",
    validate(estadoSchema),
    (req, res) => {

        const solicitud = solicitudes.find(
            s => s.id === req.params.id
        );

        if (!solicitud) {
            return res.status(404).json({
                mensaje: "Solicitud no encontrada"
            });
        }

        solicitud.estado = req.body.estado;

        res.json(solicitud);
    }
);

// ==========================
// DELETE /api/solicitudes/:id
// ==========================
router.delete("/:id", (req, res) => {

    const indice = solicitudes.findIndex(
        s => s.id === req.params.id
    );

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Solicitud no encontrada"
        });
    }

    solicitudes.splice(indice, 1);

    res.json({
        mensaje: "Solicitud eliminada correctamente"
    });
});


module.exports = router;