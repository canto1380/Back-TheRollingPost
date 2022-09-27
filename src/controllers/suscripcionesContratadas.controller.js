import SuscripcionesContratadas from "../models/suscripcionesContratadas";

const suscripcionesContratadas = {};

suscripcionesContratadas.nuevaSuscripcion = async (req, res) => {
  try {
    // const agregaTarjeta = await buscarTarjeta(req.body.nroTarjeta)
    // if(agregaTarjeta !== null) {
    //     res.status(400).json({ mensaje: 'Ya existe la tarjeta ingresada' })
    // } else {
    const suscripcionNueva = new SuscripcionesContratadas(req.body);
    await suscripcionNueva.save();
    res.status(201).json(suscripcionNueva);
    // }
  } catch (error) {
    res.status(500).json(error);
  }
};

const buscarSuscripcion = async (email) => {
  const controlSuscripcion = await SuscripcionesContratadas.findOne({
    email,
  });
  return controlSuscripcion;
};

suscripcionesContratadas.listarSuscripciones = async (req, res) => {
  try {
    // const { emailRegistro = '' } = req.query
    const suscripciones = await SuscripcionesContratadas.find()
    .populate({ path: "idSuscripcion idUsuario metodoPago" })
    //   .lean()
      .exec((err, suscrip) => {
        if (err) {
          return res
            .status(400)
            .json({ error: "No se puede listar las suscripciones" });
        } else {
          res.status(200).json(suscrip);
        }
      });
  } catch (error) {
    res.status(404).json({ mensaje: "Error al listar las suscripciones" });
  }
};

suscripcionesContratadas.eliminarSuscripcion = async (req, res) => {
  try {
    const { id } = req.params;
    await SuscripcionesContratadas.findByIdAndDelete(id);
    res.status(200).json({ mensaje: "suscripcion eliminada" });
  } catch (error) {
    res.status(400).json({ mensaje: "No se pudo eliminar la suscripcion" });
  }
};

export default suscripcionesContratadas;
