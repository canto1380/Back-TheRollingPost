const Noticia = require("../models/noticias");
const noticiasControlador = {};

/* Nueva noticia */
noticiasControlador.nuevaNoticia = async (req, res) => {
  try {
    let noticia = new Noticia(req.body);
    await noticia.save();
    res.status(201).json(noticia);
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo agregar la noticia" });
  }
};

/* Lista de noticias */
noticiasControlador.listarNoticias = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  try {
    const regex = new RegExp(search, "i");
    const filter = {
      titulo: regex,
    };
    const count = await Noticia.countDocuments();
    await Noticia.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBy, order]])
      .populate({ path: "categoria" })
      .exec((err, noticia) => {
        if (err) {
          return res.status(400).json({
            error: "No se puede listar",
          });
        } else {
          res.status(200).json({
            noticia,
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
/* Lista de noticias publicadas */
noticiasControlador.listarNoticiasPublicadas = async (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  try {
    await Noticia.find({ publicado: true })
      .sort([[sortBy, order]])
      .populate({ path: "categoria" })
      .exec((err, noticia) => {
        if (err) {
          return res.status(400).json({
            error: "No se puede listar",
          });
        } else {
          res.status(200).json(noticia);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

/* Buscar una noticia por ID */
noticiasControlador.buscarNoticia = async (req, res) => {
  try {
    const noticia = await Noticia.findById(req.params.id).populate("categoria");
    res.status(200).json(noticia);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar un noticias por ID" });
  }
};

noticiasControlador.byId = (req, res, next, id) => {
  Noticia.findById(id)
    .populate("categoria")
    .exec((err, noticia) => {
      if (err || !noticia) {
        return res.status(400).json({
          error: "noticia not found",
        });
      }
      req.noticia = noticia;
      next();
    });
};

noticiasControlador.buscarPhoto = (req, res, next) => {
  if (req.noticia.photo.data) {
    res.set("Content-Type", req.noticia.photo.contentType);
    return res.send(req.noticia.photo.data);
  }
  next();
};

/* Eliminar noticia */
noticiasControlador.eliminarNoticia = async (req, res) => {
  try {
    await Noticia.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "Noticia eliminada" });
  } catch (error) {
    res.status(404).json({ mensaje: "Error al eliminar la noticia" });
  }
};

/* Actualizar noticia */
noticiasControlador.actualizarNoticia = async (req, res) => {
  try {
    await Noticia.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ mensaje: "Noticia actualizada" });
  } catch (error) {
    res.status(404).json({ mensaje: "No se pudo actualizar" });
  }
};
export default noticiasControlador;
