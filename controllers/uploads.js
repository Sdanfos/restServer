const path = require('path');
//FileSystem
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { request, response } = require('express')
const { subirArchivo } = require('../helpers/subir-archivo')
const { Usuario, Producto } = require('../models')


const cargarArchivo = async (req = request, res = response) => {

    //Imagenes
    try {
    const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
    // const nombre = await subirArchivo(req.files, undefined, 'imgs');
    res.json({
        nombre
    })
    }catch (e) {
        res.status(400).json({msg})
    }
}

const actualizarArchivo = async (req = request, res = response) => {

    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})

    }

    //Limpiar imagen previas
    try {
        if(modelo.img){
            //borrar imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads', coleccion,modelo.img);
            if(fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen);
            }
        }
    }catch (e) {
        res.json(e);
    }


    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json({
        modelo
    });
}

const mostrarImagen = async (req, res = response) => {

    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})

    }

    //Limpiar imagen previas

    if (modelo.img) {
        //borrar imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }

    const pathImagen = path.join(__dirname,'../assets/no-image.jpg');

    res.status(404).sendFile(pathImagen);

}

const actualizarArchivoCloudinary = async (req = request, res = response) => {

    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})

    }

    //Limpiar imagen previas

    if(modelo.img) {
        //borrar imagen del servidor
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length-1];
        const [public_id] = nombre.split('.');
        await cloudinary.uploader.destroy( public_id );
    }

    const {tempFilePath} = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;

    await modelo.save();

    res.json({
        modelo
    });
}
module.exports = {
    cargarArchivo,
    actualizarArchivo,
    mostrarImagen,
    actualizarArchivoCloudinary
}