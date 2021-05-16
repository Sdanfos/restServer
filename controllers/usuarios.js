const { response } = require('express')
const bcryptjs = require('bcryptjs')


const Usuario = require('../models/usuario')


const usuarioGet = async (req, res = response) => {

    // const {q, nombre, apellido='Sin apellido', apikey, page = 1, limit = 5} = req.query;
    const { limite = 5, desde = 0  } = req.query;
    const query = {estado:true}
    let limit =  Number(limite);
    let desd = Number(desde);
    if(isNaN(limit) || isNaN(desd)){
        res.json({
            msg: 'desde y limite deben de ser numeros'
        });
    }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desd))
            .limit(Number(limit))
    ]);

    res.json({

        total,
        usuarios
    })
}

const usuarioPut = async (req, res = response) => {

    const {id} = req.params;
    const { _id ,password, google, correo, ...resto } = req.body;

    if( password ) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)


    res.json(usuario);
}

const usuarioPost = async (req, res = response) => {



    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});


    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync( password, salt )

    //Guardar BD
    await usuario.save();

    res.json({
        msg: 'post Api - controller',
        usuario
    });
}

const usuarioDelete = async (req, res = response) => {
    const {id} = req.params;

    //Borrar fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id , {estado:false});

    res.json( usuario)
}

const usuarioPatch = (req, res = response) => {
    res.json({
        msg: "patch Api - controller"
    })
}



module.exports = {
    usuarioGet:usuarioGet,
    usuarioPut:usuarioPut,
    usuarioPost:usuarioPost,
    usuarioDelete:usuarioDelete,
    usuarioPatch:usuarioPatch
}