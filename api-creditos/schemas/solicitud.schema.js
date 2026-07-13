const { z } = require("zod");

const solicitudSchema = z.object({
    dniCliente: z
        .string()
        .min(13)
        .max(15)
        .regex(/^[0-9-]+$/),

    nombreCompleto: z
        .string()
        .min(5)
        .max(100),

    montoSolicitado: z
        .number()
        .min(1000)
        .max(100000),

    plazoMeses: z
        .number()
        .int()
        .min(1)
        .max(60),

    tasaInteres: z
        .number()
        .optional()
        .default(5)
}).strict();

const updateSchema = z.object({
    nombreCompleto: z.string().min(5).max(100).optional(),
    montoSolicitado: z.number().min(1000).max(100000).optional(),
    plazoMeses: z.number().int().min(1).max(60).optional()
}).strict();

const estadoSchema = z.object({
    estado: z.enum(["APROBADA", "RECHAZADA"])
});

module.exports = {
    solicitudSchema,
    updateSchema,
    estadoSchema
};