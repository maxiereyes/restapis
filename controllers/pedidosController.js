const Pedidos = require("../models/Pedidos");

exports.nuevoPedido = async (req, res, next) => {
  const pedido = new Pedidos(req.body);
  try {
    await pedido.save();
    res.json({
      mensaje: "Order created successfully",
    });
  } catch (error) {
    res.send(error);
    next();
  }
};

exports.mostrarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedidos.find().populate("cliente").populate({
      path: "pedidos.producto",
      model: "Productos",
    });

    res.json(pedidos);
  } catch (error) {
    res.send(error);
    next();
  }
};

exports.obtenerPedido = async (req, res, next) => {
  const { id } = req.params;

  try {
    const pedido = await Pedidos.findById(id).populate("cliente").populate({
      path: "pedidos.producto",
      model: "Productos",
    });

    if (!pedido) {
      res.json({
        mensaje: "Order does not exist",
      });
      return next();
    }

    res.json(pedido);
  } catch (error) {
    res.send(error);
    next();
  }
};

exports.actualizarPedido = async (req, res, next) => {
  const { id } = req.params;
  try {
    let pedido = await Pedidos.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    res.json(pedido);
  } catch (error) {
    res.send(error);
    next();
  }
};

exports.eliminarPedido = async (req, res, next) => {
  const { id } = req.params;
  try {
    const pedido = await Pedidos.deleteOne({ _id: id });

    if (pedido.deletedCount === 0) {
      res.json({
        mensaje: "Order does not exist",
      });
      return next();
    }

    res.json({
      mensaje: "Order deleted successfully",
    });
  } catch (error) {
    res.send(error);
    next();
  }
};
