
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type:String,
        required:[true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatoria'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        require: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
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
