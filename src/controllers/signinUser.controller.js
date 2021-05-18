import User from '../models/user'
import jwt from 'jsonwebtoken'

const signinController ={}

signinController.signin = async(req,res,next)=>{
    let body = req.body;
    try {
        User.findOne({email:body.email},(err,user) =>{
            if(!user){
                console.log(user.email + "  " + user.clave) 
                console.log('Email no valido')
                
                console.log(body.email + "  " + body.clave)
                
            } else {
                if(body.clave !== user.clave){
                    console.log("Clave invalida")
                    next()
                } else {
                    const token = jwt.sign({_id:user.id}, process.env.JWT_SECRET ,{expiresIn: 60*60})
                    console.log(token)
                    res.json({
                        ok: true,token, _id:user._id
                    })
                    
                }
            }
        })
    } catch (error) {
        res.status(500).json({mensaje:"Error en la autenticacion"})
    }
}
export default signinController