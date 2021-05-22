
const Role = require('../models/role');
const {Usuario, Categoria, Producto } = require('../models')


const validarRole = async (rol = '') => {
    const existeRol = await Role.findOne( {rol} );
    if(!existeRol){
        throw new Error(`El rol ${rol} no existe`)
    }
}

const validarEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne( {correo} );
    if(existeEmail){
        throw new Error(`El correo ${correo} ya esta registrado`)
    }
}

const existeUsuarioId = async (id = '') => {
    const existeUsuario = await Usuario.findById( id );
    if(!existeUsuario){
        throw new Error(`El id ${id} no existe`)
    }
}

const validarCategoria = async (id = '') => {
    const existeCategoria = await Categoria.findById(id);
    if( !existeCategoria ){
        throw new Error(`La categoria ${id} no existe`)
    }
}

const validarProducto = async (id = '') => {
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El producto ${id}, no existe`)
    }
}


module.exports = {
    validarRole,
    validarEmail,
    existeUsuarioId,
    validarCategoria,
    validarProducto
}