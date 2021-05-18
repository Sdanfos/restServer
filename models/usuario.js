
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type:String,
        require:[true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatoria'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type:Boolean,
        default: false
    }
});
//Extrae estas variables del usuario
UsuarioSchema.methods.toJSON = function () {
    const { __v, _id, password, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('Usuario', UsuarioSchema);
