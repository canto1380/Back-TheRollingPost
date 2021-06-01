import User from '../models/user'
import jwt from 'jsonwebtoken'
import { set } from 'mongoose';

const signinController ={}



signinController.signin = async(req,res)=>{
    
    const email = req.body.email;
    const clave = req.body.clave;


try{
    // fetch user and test password verification

   await User.findOne({ email }, function(err, user) {
       
        if(user){
            console.log(user)

             // test a matching password
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
               



   
    
    
        
        
        // if (err){
        //     console.log("error")
        //     {mensaje: "ha ocurrido un error"};
        //     return err;
        // } 
        //  else if (isMatch){
        //      {mensaje: "clave coincidente"}
        //      console.log(isMatch)
        //     return isMatch

        //  }

        // console.log("error")
        // console.log(clave, isMatch);
        
        // console.log("usuario existente")// -> Password123: true
        
    


    

    // // test a failing password
    // user.comparePassword({'123Password'}, function(err, isMatch) {
    //     if (err) throw err;
    //     console.log('123Password:', isMatch); // -> 123Password: false
    // });


    // let body = req.body;
    // try {
    //     User.findOne({email:body.email},(err,user) =>{
    //         if(!user){
    //             console.log(user.email + "  " + user.clave) 
    //             console.log('Email no valido')
                
    //             console.log(body.email + "  " + body.clave)
                
    //         } else {
    //             if(body.clave !== user.clave){
    //                 console.log("Clave invalida")
    //                 next()
    //             } else {
    //                 const token = jwt.sign({_id:user.id}, process.env.JWT_SECRET ,{expiresIn: 60*60})
    //                 console.log(token)
    //                 res.json({
    //                     ok: true,token, _id:user._id
    //                 })
                    
    //             }
    //         }
    //     })
    // } catch (error) {
    //     res.status(500).json({mensaje:"Error en la autenticacion"})
    // }

export default signinController