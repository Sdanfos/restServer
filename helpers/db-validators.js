
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
// Validar productos existentes
const validarProducto = async (id = '') => {
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El producto ${id}, no existe`)
    }
}

// Validar colecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if(!incluida) {
        throw new Error(`La coleccion ${coleccion} no es pemitida, ${colecciones}`);
    }

    return true;
}


module.exports = {
    validarRole,
    validarEmail,
    existeUsuarioId,
    validarCategoria,
    validarProducto,
    coleccionesPermitidas
}