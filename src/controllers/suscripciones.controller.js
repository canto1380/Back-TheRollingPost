import Suscripciones from "../models/suscripciones";

const suscripcionesCtrl = {};

suscripcionesCtrl.nuevaSuscripcion = async (req, res) => {
  try {
    const suscripcion = new Suscripciones(req.body);
    await suscripcion.save();
    res.status(201).json(suscripcion);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "No se pudo agregar el nuevo tipo de suscripcion" });
  }
};

suscripcionesCtrl.listarSuscripciones = async (req, res) => {
  try {
    let order = req.query.order ? req.query.order : "desc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    await Suscripciones.find()
      .sort([[sortBy, order]])
      .exec((err, susc) => {
        if (err) {
          return res.status(400).json({
            error: "No se pudo listar los tipos de suscripciones",
          });
        } else {
          res.status(200).json(susc);
        }
      });
  } catch (error) {
    res.status(500).json({
      mensaje: "No se pudo encontrar los tipos de suscripciones",
      error,
    });
  }
};

suscripcionesCtrl.suscripcionesNoEliminada = async (req, res) => {
  try {
    let order = req.query.order ? req.query.order : "desc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    await Suscripciones.find({ deleted: false })
      .sort([[sortBy, order]])
      .exec((err, susc) => {
        if (err) {
          return res.status(400).json({
            error: "No se pudo listar los tipos de suscripciones",
          });
        } else {
          res.status(200).json(susc);
        }
      });
  } catch (error) {
    res.status(500).json({
      mensaje: "No se pudo encontrar los tipos de suscripciones",
      error,
    });
  }
};

suscripcionesCtrl.buscarSuscripcion = async (req, res) => {
  try {
    console.log(req.params.id)
    const suscripcion = await Suscripciones.findById(req.params.id);
    res.status(200).json(suscripcion);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar una suscripcion por ID" });
  }
};

suscripcionesCtrl.eliminarSuscripcion = async (req, res) => {
  try {
    const { id } = req.params;
    const suscripcion = await Suscripciones.findById(id);
    suscripcion.deleted = true;
    suscripcion.save();
    res.status(200).json({ mensaje: "Suscripcion eliminada" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la suscripcion" });
  }
};

suscripcionesCtrl.actualizarSuscripcion = async (req, res) => {
  try {
    await Suscripciones.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ mensaje: "Suscripcion actualizada" });
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo actualizar" });
  }
};

suscripcionesCtrl.rechazarCancelarSuscripcion = async (req, res) => {
  try {
    console.log(req.params.id);
    /*elimino usando id*/
    await Suscripciones.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "la suscripcion fue rechazada o cancelada correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "No se pudo encontra la solicitud de suscripcion",
    });
  }
};

suscripcionesCtrl.errorEliminar = async (req, res) => {
  try {
    console.log(req.params);
    const ultimo = await Suscripciones.findOneAndDelete({ email: req.params.email });
    res.status(200).json({ mensaje: "Suscripcion borrada" });
    console.log(ultimo);
  } catch (error) {
    res.status(404).json({
      mensaje: "No se pudo borrar la suscripcion",
    });
  }
};

export default suscripcionesCtrl;
