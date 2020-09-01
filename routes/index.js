const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const productoController = require("../controllers/productoController");
const pedidosController = require("../controllers/pedidosController");
const usuariosController = require("../controllers/usuariosController");

const auth = require("../middlewares/auth");

module.exports = () => {
  router.post("/clientes", auth, clienteController.nuevoCliente);
  router.get("/clientes", auth, clienteController.mostrarClientes);
  router.get("/clientes/:id", auth, clienteController.obtenerCliente);
  router.put("/clientes/:id", auth, clienteController.actualizarCliente);
  router.delete("/clientes/:id", auth, clienteController.eliminarCliente);

  router.post(
    "/productos",
    auth,
    productoController.subirArchivo,
    productoController.nuevoProducto
  );
  router.post(
    "/productos/busqueda/:query",
    auth,
    productoController.buscarProducto
  );
  router.get("/productos", auth, productoController.mostrarProductos);
  router.get("/productos/:id", auth, productoController.obtenerProducto);
  router.put(
    "/productos/:id",
    auth,
    productoController.subirArchivo,
    productoController.actualizarProducto
  );
  router.delete("/productos/:id", auth, productoController.eliminarProducto);

  router.post("/pedidos", auth, pedidosController.nuevoPedido);
  router.get("/pedidos", auth, pedidosController.mostrarPedidos);
  router.get("/pedidos/:id", auth, pedidosController.obtenerPedido);
  router.put("/pedidos/:id", auth, pedidosController.actualizarPedido);
  router.delete("/pedidos/:id", auth, pedidosController.eliminarPedido);

  router.post("/crear-cuenta", usuariosController.registrarUsuario);

  router.post("/iniciar-sesion", usuariosController.autenticarUsuario);

  return router;
};
