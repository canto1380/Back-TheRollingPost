const Pais = require("../models/pais");
const paisControlador = {};

/* Nuevo pais */
paisControlador.nuevoPais = async (req, res) => {
  try {
    const pais = new Pais(req.body);
    console.log(pais);
    await pais.save();
    res.status(201).json(pais);
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo agregar el paisss" });
  }
};

/* Lista de paises */
paisControlador.listarPaises = async (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  try {
    await Pais.find()
      .sort([[sortBy, order]])
      // .populate( {path: "categoria"})
      .exec((err, paises) => {
        if (err) {
          return res.status(400).json({
            error: "No se puede listar los paises",
          });
        } else {
          res.status(200).json(paises);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

/* Lista de paises no eliminados*/
paisControlador.paisesNoEliminados = async (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  try {
    await Pais.find( {deleted: false} )
      .sort([[sortBy, order]])
      // .populate( {path: "categoria"})
      .exec((err, paises) => {
        if (err) {
          return res.status(400).json({
            error: "No se puede listar los paises",
          });
        } else {
          res.json(paises);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

/* Buscar un pais por ID */
paisControlador.buscarPais = async (req, res) => {
  try {
    const pais = await Pais.findById(req.params.id);
    res.status(200).json(pais);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar un pais por ID" });
  }
};

paisControlador.byId = (req, res, next, id) => {
  Pais.findById(id).exec((err, pais) => {
    if (err || !pais) {
      return res.status(400).json({
        error: "No se encontro la pais",
      });
    }
    req.pais = pais;
    next();
  });
};

/* Eliminar pais */
paisControlador.eliminarPais = async (req, res) => {
  try {
    const { id } =req.params
    const pais = await Pais.findById(id)
    pais.deleted = true
    pais.save()
    res.status(200).json({ mensaje: "Pais eliminado" });
  } catch (error) {
    res.status(404).json({ mensaje: "Error al eliminar el pais" });
  }
};

/* Actualizar pais */
paisControlador.actualizarPais = async (req, res) => {
  try {
    await Pais.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ mensaje: "Pais actualizado" });
  } catch (error) {
    res.status(404).json({ mensaje: "No se pudo actualizar" });
  }
};
export default paisControlador;
