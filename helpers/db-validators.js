
const Role = require('../models/role');
const Usuario = require('../models/usuario')

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

module.exports = {
    validarRole,
    validarEmail,
    existeUsuarioId
}