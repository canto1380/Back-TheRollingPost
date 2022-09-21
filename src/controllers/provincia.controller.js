const Provincia = require("../models/provincias");
const provinciaControlador = {};

provinciaControlador.nuevaProvincia = async (req, res) => {
  try {
    const agregaProvincia = await buscarPorNombre(req.body.provincia);
    if (agregaProvincia !== null) {
      return res
        .status(400)
        .json({ mensaje: "Ya existe la provincia ingresada" });
    } else {
      const provincia = new Provincia(req.body);
      await provincia.save();
      res.status(201).json(provincia);
    }
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo agregar la provincia" });
  }
};

const buscarPorNombre = async (provincia) => {
  const controlProvincia = provincia[0].toUpperCase() + provincia.slice(1);
  const registroProvincia = await Provincia.findOne({
    provincia: controlProvincia,
  });
  return registroProvincia;
};

provinciaControlador.listarProvincia = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  try {
    const regex = new RegExp(search, "i");
    let filter = {
      provincia: regex,
    };
    const count = await Provincia.countDocuments();
    await Provincia.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBy, order]])
      .populate({ path: "idPais" })
      .exec((err, provincias) => {
        if (err) {
          return res.status(400).json({
            error: "No se puede listar las provincias",
          });
        } else {
          res.status(200).json({
            provincias,
            totalRegister: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

provinciaControlador.provinciasNoEliminadas = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  try {
    const regex = new RegExp(search, "i");
    let filters = {
      deleted: false,
      provincia: regex,
    };
    const count = await Provincia.countDocuments();
    await Provincia.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBy, order]])
      .populate({ path: "idPais" })
      .exec((err, provincias) => {
        if (err) {
          return res.status(400).json({
            error: "No se puede listar las provincias",
          });
        } else {
          res.status(200).json({
            provincias,
            totalRegister: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};
/* Lista de provincias no eliminadas sin paginacion*/
provinciaControlador.provinciasNoEliminadas1 = async (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  try {
    
    await Provincia.find({deleted: false})
      .sort([[sortBy, order]])
      .exec((err, provincias) => {
        if (err) {
          return res.status(400).json({
            error: "No se puede listar los provincias",
          });
        } else {
          res.status(200).json(provincias);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

provinciaControlador.buscarProvincia = async (req, res) => {
  try {
    const provincia = await Provincia.findById(req.params.id).populate({
      path: "idPais",
    });
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
    const { id } = req.params;
    const provincia = await Provincia.findById(id);
    provincia.deleted = true;
    provincia.save();
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

provinciaControlador.restaurarProvincia = async (req, res) => {
  try {
    const { id } = req.params;
    const provincia = await Provincia.findById(id);
    provincia.deleted = false;
    provincia.save();
    res.status(200).json({ Mensaje: "Provincia restaurada" });
  } catch (error) {
    res
      .status(400)
      .json({ Mensaje: "No se pudo restaurar la provincia indicada" });
  }
};
export default provinciaControlador;
