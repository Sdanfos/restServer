const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    validarAdmin
} =require('../middlewares')

const { validarRole, validarEmail, existeUsuarioId } = require('../helpers/db-validators')

const router = Router();
const { usuarioGet,
        usuarioPut,
        usuarioPost,
        usuarioDelete,
        usuarioPatch} = require('../controllers/usuarios')

router.get('/', usuarioGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom( validarRole ),
    validarCampos
], usuarioPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener largo minimo de 6').isLength(6),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(validarEmail),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( validarRole ),
    validarCampos
] ,usuarioPost);

router.delete('/:id',[
    validarJWT,
    validarAdmin,
    // tieneRole('ADMIN_ROLE','USER_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
], usuarioDelete);

router.patch('/', usuarioPatch);


module.exports = router;