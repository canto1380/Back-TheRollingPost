import User from '../models/user'
import jwt from 'jsonwebtoken'
import { set } from 'mongoose';

const signinController = {}



signinController.signin = async (req, res) => {

    const email = req.body.email;
    const clave = req.body.clave;
    try {
        /* busco si existe usuario admin registrado con ese email*/

        await User.findOne({ email }, function (err, user) {
            if (user) {
                console.log(user)

                /*comparo contraseñas*/
                user.comparePassword(clave, function (err, isMatch) {
                    if (isMatch) {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
                        res.cookie('t', token, { expireIn: '24' })
                        const { _id, nombre, apellido, email } = user
                        res.status(201).json({
                            token, user: { _id, email, nombre, apellido }
                        })
                        console.log('contrasena correcta')
                    } else {
                        
                        return res.status(401).json({
                             mensaje:"Error en la clave"
                        })
                    }
                })
            }
            else {
                if (err) return err;
                res.status(401).json({
                    mensaje: "el usuario no se encuentra registrado como admin"
                });
                console.log("usuario no encontrado")
                console.log(err)
            }
        })
    } catch (error) {
        console.log(error)
    }
};

export default signinController