const { request, response } = require('express');
const  Categoria  = require('../models/categoria');

// obtenerCategoria - paginado - total - populate
const obtenerCategoria = async (req =request, res=response ) => {

    const { limite = 5, desde = 0  } = req.query;
    const query = {estado:true}
    let limit =  Number(limite);
    let desd = Number(desde);
    if(isNaN(limit) || isNaN(desd)){
        res.json({
            msg: 'desde y limite deben de ser numeros'
        });
    }
    const [total,categoria] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desd))
            .limit(Number(limit))
            .populate('usuario', 'nombre')
    ]);

    res.json({
        total,
        categoria

    });
}

// obtenerCategoriaId  populate
const obtenerCategoriaId = async (req=request, res=response) => {
    const {id} = req.params;


    const categoria = await Categoria.findById(id).populate('usuario', 'nombre')

    res.json({
        categoria
    })
}

const crearCategoria = async (req = request, res= response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB =await Categoria.findOne({nombre});

    if(categoriaDB) {
        res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe `
        });
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria  = await Categoria(data);

    //Guardar en DB
    await categoria.save();

    res.status(201).json(categoria)
}

// actualizarCategoria
const actualizarCategoria = async (req=request ,res=response) => {

    const {id} = req.params;
    const {_id,estado,usuario, ...resto} = req.body;
    resto.nombre = resto.nombre.toUpperCase()

    const categoria = await Categoria.findByIdAndUpdate(id, resto);

    res.json(categoria);
}


// borrarCategoria
const borrarCategoria = async (req = request, res=response) => {
    const {id} = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false});
    const usuarioAutneticado = req.usuario

    res.json({categoria, usuarioAutneticado})

}



module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategoriaId,
    actualizarCategoria,
    borrarCategoria
};