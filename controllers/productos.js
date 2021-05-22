const { request, response } = require('express');
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');

const crearProducto = async (req = request, res = response) => {

    const { precio = 0, descripcion = '', categoria} = req.body;
    const nombre = req.body.nombre.toUpperCase();
    const productoDB = await  Producto.findOne({nombre});

    const idC = await Categoria.findById(categoria)
    if (!idC){
        res.status(400).json({
            msg: `ID Categoria ${categoria}, no existe`
        });
    }

    if(productoDB){
        res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }

    const data = {
        nombre,
        precio,
        usuario: req.usuario._id,
        categoria: idC,
        descripcion
    }

    const producto = await Producto(data);

    await producto.save();

    res.status(201).json(producto)

}


const obtenerProducto = async (req = request, res = response) => {

    const { limite = 5, desde = 0  } = req.query;
    const query = {estado:true}
    let limit =  Number(limite);
    let desd = Number(desde);
    if(isNaN(limit) || isNaN(desd)){
        res.json({
            msg: 'desde y limite deben de ser numeros'
        });
    }
    const [total,producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desd))
            .limit(Number(limit))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);

    res.json({
        total,
        producto

    });

}

const obtenerProductoId = async (req = request, res = response) => {
    const {id} = req.params;


    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')

    res.json({
        producto
    })
}

const actualizarProducto = async (req = request, res = response) => {
    const {id} = req.params;
    const {_id, estado, usuario, categoria, ...resto } = req.body;
    resto.nombre = resto.nombre.toUpperCase();

    const productos = await Producto.findByIdAndUpdate(id, resto)

    res.json(productos)
}

const borrarProducto = async (req= request, res=response) => {
    const {id} = req.params;

    const producto = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true});

    res.json(producto)
}


module.exports = {
    crearProducto,
    obtenerProducto,
    obtenerProductoId,
    actualizarProducto,
    borrarProducto
}