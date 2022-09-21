const Reserva = require("../models/reservas");
const reservaController = {};

/* Nueva noticia */
reservaController.nuevaReserva = async (req, res) => {
  console.log(req.body);
  try {
    // const reserva = new Reserva({
    //   cancelled: req.body.cancelled,
    //   paid: req.body.paid,
    //   paymentMethod: req.body.paymentMethod,
    //   total: req.body.total,
    //   currency: req.body.currency,
    //   confirmed: req.body.confirmed,
    //   code: req.body.code,
    //   cancelledAt: req.body.cancelledAt,
    //   receipt: req.body.phone,
    //   invoce: req.body.invoce,
    // });
    let reserva = new Reserva(req.body)
    await reserva.save();
    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo agregar la reserva" });
  }
};

/* Lista de noticias */
reservaController.listarReservas = async (req, res) => {
    let order = req.query.order ? req.query.order : 'desc'
    let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt'
  try {
    const reserva = Reserva.find({
        user: '5e1b8d3031cfad3d44f81cc6',
        paid: true,
        cancelled: false,
    },
    {
        "paid": 1, "cancelled": 1
    })
    .sort([['createdAt', -1]])
    .populate( {path: "user", select: 'firstName lastName email'})
    .exec((err, reserva) => {
        if (err) {
          return res.status(400).json({
            error: "No se puede listar"
          })
        }else{
           res.json(reserva);
        }

      })
  } catch (error) {
    console.log(error);
  }
};

reservaController.busqueda = async (req, res) => {
    try {
        const reserva = Reserva.find({
            cancelled: true,
        },
        {
            "cancelled": 1, "cancelledAt": 1
        })
        .sort([['createdAt', -1]])
        .populate( {path: "user", select: 'firstName lastName email'})
        .exec((err, reserva) => {
            if (err) {
              return res.status(400).json({
                error: "No se puede listar"
              })
            }else{
               res.json(reserva);
            }
    
          })
    } catch (error) {
        res.status(400).json(error)
    }
}

/* Buscar una noticia por ID */
reservaController.buscarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate("usuario");
    res.status(200).json(reserva);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar una reserva por ID" });
  }
};

reservaController.byId = (req, res, next, id) => {
  Noticia.findById(id)
    .populate("usuario")
    .exec((err, reserva) => {
      if (err || !reserva) {
        return res.status(400).json({
          error: "reserva not found",
        });
      }
      req.noticia = noticia;
      next();
    });
};

// reservaController.buscarPhoto = (req, res, next)=>{
//     if (req.noticia.photo.data) {
//         res.set('Content-Type', req.noticia.photo.contentType)
//         return res.send(req.noticia.photo.data)
//       }
//       next();
// }

/* Eliminar noticia */
reservaController.eliminarReserva = async (req, res) => {
  try {
    await Reserva.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "Reserva eliminada" });
  } catch (error) {
    res.status(404).json({ mensaje: "Error al eliminar la reserva" });
  }
};

/* Actualizar noticia */
reservaController.actualizarReserva = async (req, res) => {
  try {
    await Reserva.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ mensaje: "Noticia actualizada" });
  } catch (error) {
    res.status(404).json({ mensaje: "No se pudo actualizar" });
  }
};
export default reservaController;
