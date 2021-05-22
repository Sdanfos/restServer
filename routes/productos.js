const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    validarAdmin,
    tieneRole
} =require('../middlewares')

const { validarCategoria, validarProducto } = require('../helpers/db-validators')
const { crearProducto,
    obtenerProducto,
    obtenerProductoId,
    actualizarProducto,
    borrarProducto } = require('../controllers/productos')

const router = Router();

router.get('/', obtenerProducto )

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validarProducto)
],obtenerProductoId)


router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria').custom(validarCategoria),
    validarCampos
], crearProducto)

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validarProducto),
    validarCampos
], actualizarProducto)

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validarProducto),
    validarCampos
], borrarProducto)

module.exports = router;