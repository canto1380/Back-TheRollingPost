import Categorias from '../models/categorias'

const categoriasController= {};

/* Nueva categorias */
categoriasController.nuevaCategorias = async(req,res) =>{
    try {
        const categoria = new Categorias(req.body)
        await categoria.save()
        res.status(201).json({mensaje:"Categoria agregada con exito"})       
    } catch (error) {
        res.status(500).json({mensaje:'No se pudo agregar la categoria'})
    }
}

/* Lista de categorias */
categoriasController.listarCategorias = async(req,res) =>{
    try {
        const cateogiras = await Categorias.find()
        res.status(200).json(cateogiras)
    } catch (error) {
        res.status(404).json({mensaje: "Error al listar cateogiras"})
    }
}

/* Buscar una categoria por ID */
categoriasController.buscarCategoria = async(req,res) =>{
    try {
        const categoria = await Categorias.findById(req.params.id)
        res.status(200).json(categoria)
    } catch (error) {
        res.status(500).json({mensaje:"Error al buscar un categorias por ID"})
    }
}

/* Eliminar categoria */
categoriasController.eliminarCategoria = async(req,res)=>{
    try {
        await Categorias.findByIdAndDelete(req.params.id)
        res.status(200).json({mensaje:"Categoria eliminada"})
    } catch (error) {
        res.status(404).json({mensaje:"Error al eliminar la categoria"})
    }
}

/* Actualizar categoria */
categoriasController.actualizarcategoria = async (req,res) =>{
    try {
        await Categorias.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({mensake:"Categoria actualizada"})
    } catch (error) {
        res.status(404).json({mensaje:"No se pudo actualizar"})
    }
}
export default categoriasController