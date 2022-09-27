import mongoose, { Schema } from "mongoose";

const suscripcionesSchema = new Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 40,
    },
    descripcion: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    precio: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 10,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Suscipciones = mongoose.model("Suscripciones", suscripcionesSchema);

export default Suscipciones;
