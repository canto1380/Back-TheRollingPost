import Clientes from '../models/clientes'

const clientesCtrl = {};

clientesCtrl.nuevaSuscripcion = async(req,res) =>{
     try{   
 const clienteCreado = new Clientes({
             nomAp: req.body.nomAp,
             direccion: req.body.direccion,
             localidad: req.body.localidad,
             codigoPostal: req.body.codigoPostal,
             telefono: req.body.telefono,
             email: req.body.email,
             password: req.body.password,
             plan: req.body.plan
 })
 await clienteCreado.save();
    res.status(201).json({
         mensaje: "Suscripcion enviada correctamente"
     })
     }catch(error){
         console.log(error)
         res.status(500).json({
             mensaje: "Error al enviar la solicitud"
         });
     }
}

clientesCtrl.listarClientes = async (req,res)=>{
    try{
const arregloClientes = await Clientes.find();
        res.status(200).json(arregloClientes)
    }catch(error){
        console.log(error)
        res.status(404).json({
            mensaje: "No se pudo encontrar el cliente"
        })

    }
}

clientesCtrl.rechazarCancelarSuscripcion = async(req, res)=>{
   try{
    console.log(req.params.id)
    /*elimino usando id*/
    await Clientes.findByIdAndDelete(req.params.id)
    res.status(200).json({
        mensaje: "la suscripcion fue rechazada o cancelada correctamente"
    })
   } catch(error){
       console.log(error);
       res.status(404).json({
           mensaje: "No se pudo encontra la solicitud de suscripcion"
       })
   }
}

export default clientesCtrl;