require('./config/config.js')

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path');


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//Call routes
app.use(require('./routes/index'));

//Habilitar la carpeta Public
app.use(express.static(path.resolve(__dirname, '../public')))

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;

    console.log(`Base de datos Online`);

});



app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
})