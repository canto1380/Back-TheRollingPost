import Noticia from '../models/noticias'
import Categoria from '../models/categorias'

const noticiasControlador ={}

/* Nueva noticia */
noticiasControlador.nuevaNoticia = async(req,res) =>{
    try {
        // const {
        //     titulo,
        //     descripcion,
        //     categoria,
            
        //     pieDeFoto,
        //     descripNoticia,
        //     autor,
        //     hora,
        //     fecha
        // } = req.body

        // const noticia = new Noticia({
        //     titulo,
        //     descripcion,
        //     categoria,
            
        //     pieDeFoto,
        //     descripNoticia,
        //     autor,
        //     hora,
        //     fecha
        // })
        // if(req.file){
            //     const {filename} = req.file
            //     noticia.setImgUrl(filename) 
            // }
            
        const noticia = new Noticia(req.body)
        await noticia.save()
        res.status(201).json({mensaje:"Noticia agregada con exito"})       
    } catch (error) {
        res.status(500).json({mensaje:"No se pudo agregar noticia"})
    }
}

/* Lista de noticias */
noticiasControlador.listarNoticias = async(req,res) =>{
    try {
        const noticias = await Noticia.find()
        res.status(200).json(noticias)
    } catch (error) {
        res.status(404).json({mensaje: "Error al listar noticias"})
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