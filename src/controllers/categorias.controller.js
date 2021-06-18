import Categorias from '../models/categorias'

const categoriasController= {};

/* Nueva categorias */
categoriasController.nuevaCategorias = async(req,res) =>{
    try {
        const categoria = new Categorias({
            nombreCategoria: req.body.nombreCategoria
        })
        const nombreCategoria= req.body.nombreCategoria
        console.log(categoria)
        /*verifico que no haya otra categoria con ese nombre*/
        await Categorias.findOne({nombreCategoria}, function(err, cat){
            if(!cat){
                res.status(200).json({mensaje:"categoria disponible, guardando.."})
                categoria.save();
            }else{
                res.status(400).json(
                    {mensaje:"ya existe una categoria con ese nombre"})  
            }
        })        
        }catch(errr){
console.log(errr)
    }   
};

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