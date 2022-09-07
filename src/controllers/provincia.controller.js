const Provincia = require("../models/provincias");
const provinciaControlador = {};

provinciaControlador.nuevaProvincia = async (req, res) => {
  try {
    const provincia = new Provincia(req.body);
    console.log(provincia)
    await provincia.save();
    res.status(201).json(provincia);
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo agregar la provincia" });
  }
};

provinciaControlador.listarProvincia = async (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  try {
    await Provincia.find()
      .sort([[sortBy, order]])
      .populate( {path: "idPais"})
      .exec((err, provincias) => {
        if (err) {
          return res.status(400).json({
            error: "No se puede listar las provincias",
          });
        } else {
          res.json(provincias);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

provinciaControlador.provinciasNoEliminadas = async (req, res) => {
    let order = req.query.order ? req.query.order : "desc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    try {
      await Provincia.find( {deleted: false} )
        .sort([[sortBy, order]])
        .populate( {path: "idPais"})
        .exec((err, provincias) => {
          if (err) {
            return res.status(400).json({
              error: "No se puede listar las provincias",
            });
          } else {
            res.json(provincias);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

provinciaControlador.buscarProvincia = async (req, res) => {
  try {
    const provincia = await Provincia.findById(req.params.id).populate( {path: 'idPais'} );
    res.status(200).json(provincia);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar una provincia por ID" });
  }
};

provinciaControlador.byId = (req, res, next, id) => {
  Provincia.findById(id).exec((err, provincia) => {
    if (err || !provincia) {
      return res.status(400).json({
        error: "No se encontro la provincia",
      });
    }
    req.provincia = provincia;
    next();
  });
};

provinciaControlador.eliminarProvincia = async (req, res) => {
  try {
    const { id } =req.params
    const provincia = await Provincia.findById(id)
    provincia.deleted = true
    provincia.save()
    res.status(200).json({ mensaje: "Provincia eliminada" });
  } catch (error) {
    res.status(404).json({ mensaje: "Error al eliminar la provincia" });
  }
};

provinciaControlador.actualizarProvincia = async (req, res) => {
  try {
    await Provincia.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ mensaje: "Provincia actualizada" });
  } catch (error) {
    res.status(404).json({ mensaje: "No se pudo actualizar" });
  }
};
export default provinciaControlador;
