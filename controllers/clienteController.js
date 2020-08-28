const Clientes = require("../models/Clientes");

exports.nuevoCliente = async (req, res, next) => {
  const cliente = new Clientes(req.body);

  try {
    await cliente.save();
    res.json({
      mensaje: "Add client successfully",
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find();
    res.json(clientes);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.obtenerCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findById(req.params.id);
    if (!cliente) {
      res.json({
        mensaje: "Client does not exist!",
      });
      return next();
    }
    res.json(cliente);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.actualizarCliente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cliente = await Clientes.findOneAndUpdate(id, req.body, {
      new: true,
    });
    res.json(cliente);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.eliminarCliente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cliente = await Clientes.deleteOne({ _id: id });
    if (cliente.deletedCount === 0) {
      res.json({
        mensaje: "Cliente does not exist!",
      });
      return next();
    }
    res.json({
      mensaje: "Client delete successfully",
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
