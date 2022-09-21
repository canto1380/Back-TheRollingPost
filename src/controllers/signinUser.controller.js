import User from "../models/user";
import jwt, { sign } from "jsonwebtoken";

const signinController = {};

signinController.signin = async (req, res) => {
  const email = req.body.email;
  const clave = req.body.clave;
  try {
    /* busco si existe usuario admin registrado con ese email*/

    await User.findOne({ email }, function (err, user) {
      if (user) {
        /*comparo contraseñas*/
        user.comparePassword(clave, function (err, isMatch) {
          if (isMatch) {
            const token = jwt.sign(
              { _id: user._id, email: user.email, clave: user.clave },
              process.env.JWT_SECRET,
              { expiresIn: 60 * 60 * 24 }
            );
            res.cookie(token);
            const { nombre, apellido, email, tipoUser, _id } = user;
            res.status(201).json({
              token,
              user: { email, nombre, apellido, tipoUser, _id },
            });
          } else {
            return res.status(401).json({
              mensaje: "Error en la clave",
            });
          }
        });
      } else {
        if (err) return err;
        res.status(401).json({
          mensaje: "el usuario no se encuentra registrado como admin",
        });
      }
    });
  } catch (error) {
    res.status(500).json({mensaje: error})
  }
};

export default signinController;
