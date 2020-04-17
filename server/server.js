require('./config/config.js')

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require('./routes/usuario'))


mongoose.connect(process.env.URLDB,{useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => {
    if (err) throw err;

    console.log(`Base de datos Online`);

});



app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto 3000`);
})