const validaCampos = require('../middlewares/validar-campos');
const validaRoles = require('../middlewares/validar-roles');
const  validaJWT  = require('../middlewares/validar-jwt');
const validarArchivoSubir = require('../middlewares/validar-archivos')


module.exports = {
    ...validaCampos,
    ...validaRoles,
    ...validaJWT,
    ...validarArchivoSubir,
}