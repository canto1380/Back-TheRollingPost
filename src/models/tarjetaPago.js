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
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
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
            maxlength:16
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

const TarjetaPago = mongoose.model('tajetaPago', tarjetasSchema)
export default TarjetaPago