import User from '../models/user'
import jwt from 'jsonwebtoken'
import { set } from 'mongoose';

const signinController ={}



signinController.signin = async(req,res)=>{
    
    const email = req.body.email;
    const clave = req.body.clave;


try{
    /* busco si existe usuario admin registrado con ese email*/

   await User.findOne({ email }, function(err, user) {
       
        if(user){
            console.log(user)

            /*comparo contraseñas*/
            user.comparePassword(clave, function(err, isMatch) {
                if (isMatch){
                    res.status(201).json({
                        mensaje: "Clave correcta"
                    })
                    console.log("contraseña correcta")
                }else{
                    res.status(401).json({
                        mensaje: "Clave incorrecta"
                    })
                    console.log("contraseña incorrecta")
                    
                } 
        })
    }
    else{
        if (err) return err;
            res.status(401).json({
                mensaje: "el usuario no se encuentra registrado como admin"
            });
            console.log("usuario no encontrado")
            console.log(err)
            
        
    }
})
}catch(error){
        console.log(error)
    }
   };
               
export default signinController