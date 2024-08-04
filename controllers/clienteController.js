const Clientes = require('../models/Clientes')

// agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    console.log(req.body);
    const cliente = new Clientes(req.body);

    try {
        //almacenar registro
        await cliente.save();
        res.json({mensaje : 'Se agregó un nuevo cliente'});
    } catch (error) {
        // si hay error, console.log y next
        res.send(error);
        next();
    }
}

//muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
} 

//muestra un cliente por id
exports.mostrarCliente = async (req, res, next) => {
        const cliente = await Clientes.findById(req.params.idCliente);
        if(!cliente){
            res.json({mensaje:'El cliente no existe'});
            next();
        }

        res.json(cliente);
} 

//actualiza cliente
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.idCliente},
            req.body,{
                new : true
            });
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.findOneAndDelete({_id : req.params.idCliente});
        res.json({mensaje : 'El cliente ha sido eliminado'});
    } catch (error) {
        console.log(error);
        next();
     }
}