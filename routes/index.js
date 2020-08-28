const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const productoController = require("../controllers/productoController");

module.exports = () => {
  router.post("/clientes", clienteController.nuevoCliente);
  router.get("/clientes", clienteController.mostrarClientes);
  router.get("/clientes/:id", clienteController.obtenerCliente);
  router.put("/clientes/:id", clienteController.actualizarCliente);
  router.delete("/clientes/:id", clienteController.eliminarCliente);

  router.post(
    "/productos",
    productoController.subirArchivo,
    productoController.nuevoProducto
  );
  router.get("/productos", productoController.mostrarProductos);
  router.get("/productos/:id", productoController.obtenerProducto);
  router.put(
    "/productos/:id",
    productoController.subirArchivo,
    productoController.actualizarProducto
  );
  router.delete("/productos/:id", productoController.eliminarProducto);

  return router;
};
