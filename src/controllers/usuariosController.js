import Usuarios from "../models/usuarios";

const usuariosController = {};

/* Nueva categorias */
usuariosController.nuevoUsuario = async (req, res) => {
  try {
    const usuario = new Usuarios({
      avatar: req.body.avatar,
      birthdate: req.body.birthdate,
      city: req.body.city,
      country: req.body.country,
      deleted: req.body.deleted,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      prefix: req.body.prefix,
    });
    /*verifico que no haya otra categoria con ese nombre*/
    res.status(200).json(usuario);
    usuario.save();
  } catch (errr) {
    console.log(errr);
  }
};

/* Lista de categorias */
usuariosController.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuarios.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(404).json({ mensaje: "Error al listar usuarios" });
  }
};

/* Buscar una categoria por ID */
usuariosController.buscarUsuario = async (req, res) => {
  try {
    const usuario = await Usuarios.findById(req.params.id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar un usuario por ID" });
  }
};

/* Eliminar categoria */
usuariosController.eliminarUsuario = async (req, res) => {
  try {
    await Usuarios.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "Usuario eliminada" });
  } catch (error) {
    res.status(404).json({ mensaje: "Error al eliminar el usuario" });
  }
};

/* Actualizar categoria */
usuariosController.actualizarUsuario = async (req, res) => {
  try {
    await Usuarios.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ mensake: "Usuario actualizado" });
  } catch (error) {
    res.status(404).json({ mensaje: "No se pudo actualizar" });
  }
};
export default usuariosController;
