const validaCampos = require('../middlewares/validar-campos');
const validaRoles = require('../middlewares/validar-roles');
const  validaJWT  = require('../middlewares/validar-jwt');


module.exports = {
    ...validaCampos,
    ...validaRoles,
    ...validaJWT,
}