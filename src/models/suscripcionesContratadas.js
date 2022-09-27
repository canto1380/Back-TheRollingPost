import mongoose, { Schema } from 'mongoose'

const suscripcionesContratadasSchema = new Schema(
    {
        idUsuario: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        idSuscripcion: {
            type: Schema.Types.ObjectId,
            ref: 'Suscripciones',
            required: true
        },
        metodoPago: {
            type: Schema.Types.ObjectId,
            ref: 'TarjetaPago',
            required: true
        }
    },
    { timestamps: true }
);

const SuscripcionesContratadas = mongoose.model('SuscripcionesContratadas', suscripcionesContratadasSchema)
export default SuscripcionesContratadas
