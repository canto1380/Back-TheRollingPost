import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
      maxlength: 60,
    },
    apellido: {
      type: String,
      trim: true,
      required: true,
      maxlength: 60,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 40,
    },
    clave: {
      type: String,
      trim: true,
      required: true,
      minlength: 8,
      maxlength: 15,
    },
    telefono: {
      type: Number,
      trim: true,
      required: true,
      minlength: 10,
      maxlength: 12,
    },
    tipoUser: {
      type: String,
      trim: true,
      required: true,
      values: [
        "CLIENT_ROLE",
        "ADMIN_ROLE"
      ],
      default: "CLIENT_ROLE",
    },
    direccion: {
      type: String,
      trim: true,
      required: true,
      maxlenght: 30
    },
    idLocalidad: {
      type: Schema.Types.ObjectId,
        ref:'Localidad',
        required: true
    },
    idProvincia:{
        type: Schema.Types.ObjectId,
        ref:'Provincia',
        required: true
    },
    idPais:{
      type: Schema.Types.ObjectId,
      ref:'Pais',
      required: true
  },
    codigoPostal: {
      type: Number,
      trim: true,
      required: true,
      minlength: 4,
      maxlength: 6,
    },
    deleted: {
      type: Boolean,
      default: false
  }
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  bcrypt
    .genSalt(10)
    .then((salts) => {
      bcrypt
        .hash(this.clave, salts)
        .then((hash) => {
          this.clave = hash;
          next();
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

userSchema.methods.comparePassword = function (clavee, cb) {
  bcrypt.compare(clavee, this.clave, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("user", userSchema);
export default User;
