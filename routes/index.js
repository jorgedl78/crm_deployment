const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

// middle para proteger todas las rutas
const auth = require('../middleware/auth');

module.exports = function() {

    router.post('/clientes',auth, clienteController.nuevoCliente);
    router.get('/clientes', auth, clienteController.mostrarClientes);
    router.get('/clientes/:idCliente',auth, clienteController.mostrarCliente)
    router.put('/clientes/:idCliente',auth, clienteController.actualizarCliente);
    router.delete('/clientes/:idCliente',auth, clienteController.eliminarCliente);


    /** PRODUCTOS */
    // nuevos productos
    router.post('/productos', auth,
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    // Muestra todos los productos
    router.get('/productos', auth,
        productosController.mostrarProductos);

    // muestra un producto en especifico por su ID
    router.get('/productos/:idProducto', auth,
        productosController.mostrarProducto);

    // Actualizar Productos
    router.put('/productos/:idProducto', auth,
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    // Eliminar Productos
    router.delete('/productos/:idProducto', auth, 
        productosController.eliminarProducto
    );

    // Busqueda de Productos
    router.post('/productos/busqueda/:query',productosController.buscarProducto);


    /** PEDIDOS */    
    router.post('/pedidos/nuevo/:idUsuario',auth, pedidosController.nuevoPedido);
    router.get('/pedidos',auth, pedidosController.mostrarPedidos);
    router.get('/pedidos/:idPedido',auth, pedidosController.mostrarPedido);
    router.put('/pedidos/:idPedido',auth, pedidosController.actualizarPedido);
    router.put('/pedidos/:idPedido',auth, pedidosController.eliminarPedido);

    //Usuarios
    router.post('/crear-cuenta',auth,usuariosController.registrarUsuario);

    router.post('/iniciar-sesion',usuariosController.autenticarUsuario);



    return router;
}