const Comentario =require ('../models/comentarios')
const Noticia = require('../models/noticias')

const comentariosController ={};

/* Nuevo comentario */
comentariosController.nuevoComentario = async(req,res) =>{
    try {
        const comentario = new Comentario(req.body)
        await comentario.save()
        res.status(201).json({mensaje:"Comentario agregado"})
    } catch (error) {
        res.status(500).json({mensaje:"Error al agregar un comentario"})
    }
}

/* Lista de comentarios */
comentariosController.listarComentarios = async(req,res) =>{
    let order = req.query.order ? req.query.order : 'desc'
    let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt'
    try {
        await Comentario.find()
        .sort([[sortBy, order]])
        .populate({path: "idNoticia"})
        .exec((err, coment) =>{
            if(err){
                return res.status(400).json({error:"Error al listar los comentarios"})
            }
            res.json(coment)
        })
    } catch (error) {
        res.status(404).json({mensaje: "Error al listar los comentarios"})
    }
}

/* Buscar un comentario por ID */
comentariosController.buscarComentario = async(req,res) =>{
    try {
        const comentario = await Comentario.findById(req.params.id)
        res.status(200).json(comentario)
    } catch (error) {
        res.status(500).json({mensaje:"Error al buscar un comentario por ID"})
    }
}

/* Eliminar comentario */
comentariosController.eliminarComentario = async(req,res)=>{
    try {
        await Comentario.findByIdAndDelete(req.params.id)
        res.status(200).json({mensaje:"Comentario eliminado"})
    } catch (error) {
        res.status(404).json({mensaje:"Error al eliminar el comentario"})
    }
}

export default comentariosController