const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



exports.registrarUsuario = async (req, res) => {
    // leo los datos recibidos del usuario y lo coloco en un objeto usuario para guardarlo
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({mensaje: 'Usuario creado correctamente'});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Hubo un error al registrar'});
    }
}

exports.autenticarUsuario = async (req, res, next) => {
    //buscar el usuario para saber si existe
    console.log(req.body);

    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({ email: email}); 


    if(!usuario){
        // respondo status 401 qie es un código especial de error de NO AUTORIZADO
        await res.status(401).json({mensaje: 'El usuario no existe'});
        next();
    } else {
        // El usuario existe asique verifico el password hasheado

        if(!bcrypt.compareSync(password, usuario.password)){
            await res.status(401).json({ mensaje : 'password incorrecto'});
            next();
        } else {
            // password correcto. Firmar el token el cual se crea con una serie de datos que le pasamos como parametro
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id
                },
                'LLAVESECRETA',
                {
                expiresIn: '1h'
            }
            );
            
            // respondemos enviando el token generado
            res.json({ token });
        }

    }
}