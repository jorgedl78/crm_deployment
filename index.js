const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env'});


// Cors permite que un cliente se conectye a otro servidorpara intercambiar recursos
const cors = require('cors');


// conectar mongo
mongoose.Promise = global.Promise;
//const uri = "mongodb://localhost/restapis";
const uri = process.env.DB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

/*mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Puedes definir tus esquemas y modelos aquí
  })
  .catch(err => {
    console.error("Error connecting to MongoDB: ", err);
  });*/


const app = express();

// habilitamos carpeta publica
app.use(express.static('uploads'));


// havilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//definir un dominio(s) para recibir las peticiones (armar una lista blanca)

const whiteList = [process.env.FRONTEND_URL];
//const whiteList = ['http://localhost:3000','http://otroServidor:xxxx'];
const corsOptions = {
  origin: (origin, callback) => {
    //console.log(origin);
    //Revisar si la petición viene de un servidor que está en whiteList
    const existe = whiteList.some(dominio => dominio === origin);
    if(existe) {
      callback(null, true);
    }else{
      callback(new Error('Acceso no permitido por CORS'));
    }
  }
}


//habilitar cors
app.use(cors(corsOptions));

app.use('/', routes());



const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

// iniciar app
app.listen(port, host, () => {
  console.log('El servidor está funcionando');
});