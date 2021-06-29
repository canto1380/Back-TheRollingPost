import User from '../models/user'
import jwt, { sign } from 'jsonwebtoken'

const signinController = {
    // signin: async (req, res) => {

    //     const email = req.body.email;
    //     const clave = req.body.clave;
    //     try {
    //         /* busco si existe usuario admin registrado con ese email*/
    
    //         await User.findOne({ email }, function (err, user) {
    //             if (user) {
    //                 console.log(user)
    
    //                 /*comparo contraseñas*/
    //                 user.comparePassword(clave, function (err, isMatch) {
    //                     if (isMatch) {
    //                         const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{ expiresIn:'10s'})
    //                         res.cookie( token)
    //                         const { nombre, apellido, email, _id } = user
    //                         res.status(201).json({
    //                             token, user: {_id, email, nombre, apellido }
    //                         })
    //                         console.log('contrasena correcta')
    //                         console.log(req.user)
    //                     } else {
                            
    //                         return res.status(401).json({
    //                              mensaje:"Error en la clave"
    //                         })
    //                     }
    //                 })
    //             }
    //             else {
    //                 if (err) return err;
    //                 res.status(401).json({
    //                     mensaje: "el usuario no se encuentra registrado como admin"
    //                 });
    //                 console.log("usuario no encontrado")
    //                 console.log(err)
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // },

    // headers: async(req,res,next)=>{
    //     const token = req.headers['access-token']
    //     console.log(req.headers['access-token'])
    //     if(token){
    //         console.log('adentro del if')
    //         try {
    //             const {_id} = jwt.verify(token, process.env.JWT_SECRET)
    //             req.user = _id
    //             console.log(req.user)
    //             console.log('try')

    //         } catch (error) {
    //             console.log('catch')
    //             const newToken =  await signinController.checkToken(token)
    //             console.log(newToken)
    //             req.user = newToken.user
    //             if(newToken.token){
    //                 res.set("Access-Control-Expose-Headers", "access-token")
    //                 res.set("access-token", newToken.token)
    //             }
    //         }
    //     }
    //     console.log('afuera del if')
    //     next()
    // },
    // checkToken: async( token) =>{
    //     let idUser = null;
    //     console.log(idUser)
    //     try {
    //         const {_id} = await jwt.decode(token);
    //         idUser = _id
    //     } catch (error) {
    //         return{}
    //     }
    //     console.log(idUser)
    //     const user = await  User.findOne({_id: idUser})
    //     const [newToken] = signinController.signin()
    //     return {
    //         user: user._id,
    //         token: newToken
    //     }
    // }
}



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
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{ expiresIn:60*60*24})
                        res.cookie( token)
                        const { nombre, apellido, email } = user
                        res.status(201).json({
                            token, user: { email, nombre, apellido }
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

// signinController.rutasProtegidas = (req,res, next) =>{
//     const token = req.headers['access-token'];
//     console.log(req.headers)
//     if(token){
//         console.log(token)
//         jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
//             if(err){
//                 return res.json({mensaje:"Token invalido"})
//             } else {
//                 req.decoded = decoded
//                 res.json(token)
//                 next()
//             }
//         })
//     } else {
//         res.send({mensaje:"Token no proveido"})
//     }
// }
// signinController.headers ={
//     (req,res,next)=>{
//     console.log(req.headers);
//     const token = req.headers["access-token"]
//     next()
// }
// }

export default signinController