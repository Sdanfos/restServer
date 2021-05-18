const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const { generarJwt } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');

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

module.exports = {
    login
};