import User from '../models/user'

const userController = {}
 
/* Nuevo user */
userController.nuevoUsuario = async(req,res) =>{
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).json({mensaje:"Usuario agregado con exito"})       
    } catch (error) {
        res.status(500).json({mensaje:'No se pudo agregar el usuario'})
    }
}

/* Lista de usuarios */
userController.listarUsuarios = async(req,res) =>{
    try {
        const usuarios = await User.find()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(404).json({mensaje: "Error al listar usuarios"})
    }
}

/* Buscar un usuario por ID */
userController.buscarUsuario = async(req,res) =>{
    try {
        const usuario = await User.findById(req.params.id)
        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({mensaje:"Error al buscar un usuarios por ID"})
    }
}

/* Eliminar usuarios */
userController.eliminarUsuario = async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({mensaje:"Usuario eliminado"})
    } catch (error) {
        res.status(404).json({mensaje:"Error al eliminar el usuario"})
    }
}

/* Actualizar usuario */
userController.actualizarUsuario = async (req,res) =>{
    try {
        await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({mensake:"Usuario actualizado"})
    } catch (error) {
        res.status(404).json({mensaje:"No se pudo actualizar"})
    }
}
export default userController