const Localidad = require("../models/localidad");
const localidadControlador = {};

localidadControlador.nuevaLocalidad = async (req, res) => {
  try {
    const localidad = new Localidad(req.body);
    await localidad.save();
    res.status(201).json(localidad);
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo agregar la localidad" });
  }
};

localidadControlador.listarLocalidad = async (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  try {
    await Localidad.find()
      .sort([[sortBy, order]])
      .populate( {path: "idProvincia", populate: {path: 'idPais'}})
      .exec((err, localidad) => {
        if (err) {
          return res.status(400).json({
            error: "No se puede listar las localidades",
          });
        } else {
          res.json(localidad);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

localidadControlador.localidadesNoEliminadas = async (req, res) => {
    let order = req.query.order ? req.query.order : "desc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    try {
      await Localidad.find( {deleted: false} )
        .sort([[sortBy, order]])
        .populate( {path: "idProvincia"})
        .exec((err, localidad) => {
          if (err) {
            return res.status(400).json({
              error: "No se puede listar las localidades",
            });
          } else {
            res.json(localidad);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

localidadControlador.buscarLocalidad = async (req, res) => {
  try {
    const localidad = await Localidad.findById(req.params.id).populate( {path: 'idProvincia'} );
    res.status(200).json(localidad);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar una localidad por ID" });
  }
};

localidadControlador.byId = (req, res, next, id) => {
  Localidad.findById(id).exec((err, localidad) => {
    if (err || !localidad) {
      return res.status(400).json({
        error: "No se encontro la localidad",
      });
    }
    req.localidad = localidad;
    next();
  });
};

localidadControlador.eliminarLocalidad = async (req, res) => {
  try {
    const { id } =req.params
    const localidad = await Localidad.findById(id)
    localidad.deleted = true
    localidad.save()
    res.status(200).json({ mensaje: "Localidad eliminada" });
  } catch (error) {
    res.status(404).json({ mensaje: "Error al eliminar la localidad" });
  }
};

localidadControlador.actualizarLocalidad = async (req, res) => {
  try {
    await Localidad.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ mensaje: "Localidad actualizada" });
  } catch (error) {
    res.status(404).json({ mensaje: "No se pudo actualizar" });
  }
};
export default localidadControlador;
