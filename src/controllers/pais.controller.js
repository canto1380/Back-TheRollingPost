const Pais = require("../models/pais");
const paisControlador = {};

/* Nuevo pais */
paisControlador.nuevoPais = async (req, res) => {
  try {
    const agregaPais = await buscarPorNombre(req.body.pais)
    if(agregaPais !== null) {
      return res.status(400).json({ mensaje: 'Ya existe el pais ingresado'})
    } else {
      const pais = new Pais(req.body);
      await pais.save();
      res.status(201).json(pais);
    }
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo agregar el pais" });
  }
};

const buscarPorNombre = async(pais) => {
  const controlPais = pais[0].toUpperCase() + pais.slice(1)
  const registroPais = await Pais.findOne({pais: controlPais})
  return registroPais
}

/* Lista de paises */
paisControlador.listarPaises = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  try {
    const regex = new RegExp(search, 'i')
    let filters = {
      pais: regex
    }
    const count = await Pais.countDocuments()
    await Pais.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBy, order]])
      .exec((err, paises) => {
        if (err) {
          return res.status(400).json({
            error: "No se puede listar los paises",
          });
        } else {
          res.status(200).json({paises, totalRegister: count, totalPages: Math.ceil(count / limit), currentPage: page});
        }
      });
  } catch (error) {
    console.log(error);
  }
};

/* Lista de paises no eliminados*/
paisControlador.paisesNoEliminados = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  try {
    const regex = new RegExp(search, 'i')
    let filters = {
      deleted: false,
      pais: regex
    }
    const count = await Pais.countDocuments()
    await Pais.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBy, order]])
      .exec((err, paises) => {
        if (err) {
          return res.status(400).json({
            error: "No se puede listar los paises",
          });
        } else {
          res.status(200).json({paises, totalRegister: count, totalPages: Math.ceil(count / limit), currentPage: page});
        }
      });
  } catch (error) {
    console.log(error);
  }
};

/* Lista de paises no eliminados sin paginacion*/
paisControlador.paisesNoEliminados1 = async (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  try {
    
    await Pais.find({deleted: false})
      .sort([[sortBy, order]])
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
        error: "No se encontro el pais",
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
    const editaPais = await buscarPorNombre(req.body.pais)
    if(editaPais !== null) {
      res.status(400).json({ mensaje: "Ya existe el pais ingresado" });
    } else {
      await Pais.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ mensaje: "Pais actualizado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo actualizar" });
  }
};
paisControlador.restaurarPais = async(req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const pais = await Pais.findById(id)
    pais.deleted = false
    pais.save()
    res.status(200).json({ Mensaje: 'Pais reestablecido' })
  } catch (error) {
    res.status(400).json({ Mensaje: 'No se pudo reestablecer el pais indicado' })
  }
}

export default paisControlador;
