const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    //autorización recibida a través del header (cuando consumo la api)
    const authHeader = req.get('Authorization');

    if(!authHeader) {
        const error = new Error('No autenticado, no hay JWT');
        error.statusCode = 401; //error de no autorizado
        throw error;
    }

    // obtener el token y verificarlo teniendo en cuenta
    // que la Authorization que recibo tiene este formato: Bearer 736gerw87f3yf3q
    // entonces extraigo el token ques está en la posición 1 
    const token = authHeader.split(' ')[1]
    let revisarToken;
    try {
        revisarToken = jwt.verify(token, "LLAVESECRETA");

        
    } catch (error) {
        error.statusCode=500;
        throw error;
    }

    // si es un token valido pero hay algún error
    if(!revisarToken) {
        const error = new Error('No autenticado');
        error.statusCode=401;
        throw error;
    }

    next(); //si todo está correcto continua con la siguiente api o middlerware
}
