
const { Router } = require('express');
const { check } = require('express-validator');

const {coleccionesPermitidas} = require("../helpers");
const { validarCampos, validarArchivoSubir } = require('../middlewares')
const { cargarArchivo,actualizarArchivo, mostrarImagen, actualizarArchivoCloudinary  } = require('../controllers/uploads')


const router = Router();

router.post('/',validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'No es un ID valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarArchivoCloudinary);
//actualizarArchivo

router.get('/:coleccion/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)

module.exports= router ;