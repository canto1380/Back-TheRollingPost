import User from '../models/user'
import jwt from 'jsonwebtoken'

const signinController ={}

signinController.signin = async(req,res)=>{
    let body = req.body;
    try {
        User.findOne({email:body.email},(err,user) =>{
            if(!user){
                console.log('Email no valido')
                console.log(user.email + "  " + user.clave) 
                console.log(body.email + "  " + body.clave)
            } else {
                if(body.clave !== user.clave){
                    console.log("Clave invalida")
                } else {
                    const token = jwt.sign({_id:user.id}, process.env.JWT_SECRET ,{expiresIn: 60*60})
                    res.status(200).json({mensaje:"Autenticacion validada"})
                    console.log(token)
                }
            }
        })
    } catch (error) {
        res.status(500).json({mensaje:"Error en la autenticacion"})
    }
}
export default signinController