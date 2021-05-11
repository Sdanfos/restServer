const { response } = require('express')


const usuarioGet = (req, res = response) => {

    const {q, nombre, apellido='Sin apellido', apikey, page = 1, limit = 5} = req.query;

    res.json({
        msg: "get Api - controller",
        q,
        nombre,
        apellido,
        apikey,
        page,
        limit
    })
}

const usuarioPut = (req, res = response) => {

    const id = req.params.id;

    res.status(500).json({
        msg: "put Api - controller",
        id
    });
}

const usuarioPost = (req, res = response) => {

    const {name, age} = req.body;

    res.json({
        msg: 'post Api - controller',
        name,
        age
    });
}

const usuarioDelete = (req, res = response) => {
    res.json({
        msg: "delete Api - controller"
    })
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