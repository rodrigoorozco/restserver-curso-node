const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { verificaToken, verificaAdmin_Role } = require('../middleware/authentication');
const _ = require('underscore');
const app = express();



//Primer parametro ruta, segundo middleware,tercero callback
app.get('/usuario', verificaToken, function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    let estadoTrue = {
        estado: true
    }

    //primer parametro del find, es el mismo que se ejecuta en MongoDB
    // Segudo parametro del find son los campos que quiero regesar
    Usuario.find(estadoTrue, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments(estadoTrue, (err, conteo) => {
                res.json({
                    ok: true,
                    total: conteo,
                    usuarios
                })
            });


        })

});



app.post('/usuario', [verificaToken, verificaAdmin_Role], function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
});

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });


});

app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {
    //Obtener id
    let id = req.params.id;

    // ====== Borrado logico del registro

    let status = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, status, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `Usuario no encontrado`,
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

    // ====== Borrar registro fisicamente ========
    // Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{

    //     if(err){
    //         return res.status(400).json({
    //             ok:false,
    //             err
    //         });
    //     }
    //     if(!usuarioBorrado){
    //          return res.status(400).json({
    //             ok:false,
    //             err:{
    //                 message:`Usuario no encontrado`,
    //             }
    //         });
    //     }

    //         res.json({
    //             ok:true,
    //             usuario:usuarioBorrado
    //         });
    // });

});


module.exports = app;