import mongoose, { Schema } from 'mongoose'

const tarjetasSchema = new Schema(
    {
        titularTarjeta: {
            type: String,
            trim: true,
            required: true,
            minlength: 10,
            maxlength: 70
        },
        emailRegistro: {
            type: String,
            trim: true,
            required: true,
            maxlength: 40,
          },
        tipoDocumento: {
            type: String,
            trim: true,
            required: true
        },
        nroDocumento: {
            type: Number,
            required: true,
            trim: true,
            minlength: 6,
            maxlength: 11
        },
        tipoTarjeta: {
            type: String,
            trim: true,
            required: true
        },
        nroTarjeta: {
            type: Number,
            trim: true,
            required: true,
            minlength: 16,
            maxlength:16,
            unique: true,
        },
        mes: {
            type: Number,
            required: true,
            trim: true
        },
        anio: {
            type: Number,
            required: true,
            trim: true
        },
        cvv: {
            type: Number,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 3
        }
    },
    {timestamps: true}
);

const TarjetaPago = mongoose.model('TarjetaPago', tarjetasSchema)
export default TarjetaPago