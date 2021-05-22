
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, tieneRole } = require('../middlewares')
const { crearCategoria, obtenerCategoria,obtenerCategoriaId, actualizarCategoria, borrarCategoria } = require('../controllers/categorias')
const { validarCategoria, validarRole, validarEmail, existeUsuarioId } = require('../helpers/db-validators')


const router = Router();


//obtener todas las categorias - publico
router.get('/', obtenerCategoria);

//obtener categorias por id - publico
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validarCategoria),
    validarCampos
], obtenerCategoriaId);


//Crear categoria - privada - cualquier persona con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar categoria - privada - cualquier persona con token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validarCategoria),
    validarCampos
] ,actualizarCategoria);

//Borrar categoria - Admin
router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(validarCategoria),
    validarCampos
],borrarCategoria);



module.exports= router ;