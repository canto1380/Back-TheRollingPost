import Noticia from '../models/noticias'
import fs from "fs"
import formidable from 'formidable'
import _ from 'lodash'


const noticiasControlador ={}

/* Nueva noticia */
noticiasControlador.nuevaNoticia = async(req,res) =>{
    try {
        let not = new formidable.IncomingForm()
        not.keepExtensions = true;
        not.parse(req, (err, campos, files)=>{
            if(err){
                res.status(400).json({mensaje:"Error en la carga de la img"})
            }
            const {titulo, descripcion, categoria, pieDeFoto, descripNoticia, autor, hora, fecha} = campos;
            let noticia = new Noticia(campos)
    
            if(files.photo){
                noticia.photo.data = fs.readFileSync(files.photo.path)
                noticia.photo.contentType = files.photo.type
            }
            noticia.save()
            res.json(noticia)
        })
    } catch (error) {
        res.status(500).json({mensaje:"No se pudo agregar la noticia"})
    }
}

/* Lista de noticias */
noticiasControlador.listarNoticias = async(req,res) =>{
   let order = req.query.order ? req.query.order : 'desc'
   let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt'
    try {
        await Noticia.find()
        // .select("-photo")
        .sort([[sortBy, order]])
        .exec((err, noticia) => {
         if (err) {
           return res.status(400).json({
             error: "No se puede listar"
           })
         }
         res.json(noticia);
       })
    } catch (error) {
        console.log(error)
    }
}

/* Buscar una noticia por ID */
noticiasControlador.buscarNoticia = async(req,res) =>{
    try {
        const noticia = await Noticia.findById(req.params.id)
        res.status(200).json(noticia)
    } catch (error) {
        res.status(500).json({mensaje:"Error al buscar un noticias por ID"})
    }
}

noticiasControlador.byId =(req,res,next,id)=>{
    Noticia.findById(id)
    .exec((err, noticia) => {
      if (err || !noticia) {
        return res.status(400).json({
          error: "noticia not found"
        });
      }
      req.noticia = noticia;
      next();
    })
}

noticiasControlador.buscarPhoto = (req, res, next)=>{
    if (req.noticia.photo.data) {
        res.set('Content-Type', req.noticia.photo.contentType)
        return res.send(req.noticia.photo.data)
      }
      next();
}

/* Eliminar noticia */
noticiasControlador.eliminarNoticia = async(req,res)=>{
    try {
        await Noticia.findByIdAndDelete(req.params.id)
        res.status(200).json({mensaje:"Noticia eliminada"})
    } catch (error) {
        res.status(404).json({mensaje:"Error al eliminar la noticia"})
    }
}

/* Actualizar noticia */
noticiasControlador.actualizarNoticia = async (req,res) =>{
    try {
        await Noticia.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({mensaje:"Noticia actualizada"})
    } catch (error) {
        res.status(404).json({mensaje:"No se pudo actualizar"})
    }
}
export default noticiasControlador