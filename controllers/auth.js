const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const { generarJwt } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');
const { googleVerify } = require('../helpers/google-verify')

const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {
        //Verificar si existe el correo
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - correo "
            })
        }

        //Usuario esta activo?
        if(!usuario.estado){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - estado:false "
            })
        }

        //Verificar la contraseña
        const validarPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validarPassword){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - Password"
            })
        }

        // Generando el JWT
        const token = await generarJwt( usuario.id );


        res.json({
            msg: 'Login ok',
            usuario,
            token
        })
    }catch (e){
        console.log(e)
        return res.status(500).json({
            msg: 'Error'
        })
    }
}

const googleSignin = async (req, res = response) => {

    const {id_token} = req.body;


    try {
        const {correo, nombre, img} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            //Se crea el usuario
            const data = {
                nombre,
                correo,
                password:':P',
                img,
                google:true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario en BD
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Usuario bloqueado'
            })
        }

        // Generar el JWT
        const token = await generarJwt( usuario.id );

        res.json({
            usuario,
            token
        })
    }catch (e) {

        res.status(400).json({
            msg: 'Token de google no es válido'
        })


    }




}

module.exports = {
    login,
    googleSignin
};