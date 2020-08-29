const Productos = require("../models/Productos");
const multer = require("multer");
const shortid = require("shortid");

const configurationMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("File format not valid"));
    }
  },
};

const upload = multer(configurationMulter).single("imagen");

exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({
        mensaje: error,
      });
    }
    return next();
  });
};

exports.nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body);
  try {
    if (req.file.filename) {
      producto.imagen = req.file.filename;
    }

    await producto.save();
    res.json({
      mensaje: "Product created successfully",
    });
  } catch (error) {
    res.send(error);
    next();
  }
};

exports.mostrarProductos = async (req, res, next) => {
  try {
    const productos = await Productos.find();
    res.json(productos);
  } catch (error) {
    res.send(error);
    next();
  }
};

exports.obtenerProducto = async (req, res, next) => {
  const { id } = req.params;
  const producto = await Productos.findById(id);

  if (!producto) {
    res.json({
      mensaje: "Product not exist!",
    });
    return next();
  }

  res.json(producto);
};

exports.actualizarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    let nuevoProducto = req.body;

    if (req.file.filename) {
      nuevoProducto.imagen = req.file.filename;
    } else {
      let productoBd = await Productos.findById(id);
      nuevoProducto.imagen = productoBd.imagen;
    }

    const producto = await Productos.findOneAndUpdate(id, nuevoProducto, {
      new: true,
    });

    res.json(producto);
  } catch (error) {
    res.send(error);
    next();
  }
};

exports.eliminarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await Productos.deleteOne({ _id: id });
    if (producto.deletedCount === 0) {
      res.json({
        mensaje: "Product not exist",
      });
      return next();
    }

    res.json({
      mensaje: "Product deleted successfully",
    });
  } catch (error) {
    res.send(error);
    next();
  }
};

exports.buscarProducto = async (req, res, next) => {
  try {
    const { query } = req.params;
    const producto = await Productos.find({ nombre: new RegExp(query, "i") });
    res.json(producto);
  } catch (error) {
    res.send(error);
    next();
  }
};
