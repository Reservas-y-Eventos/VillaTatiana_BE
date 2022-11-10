const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    dni: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstLogin: {
        type: Boolean,
        default: true
    },
    state: {
        type: Boolean,
        default: true,
    },
    oldPassword: [
        {
            type: String,
        }
    ],
    attempts:{
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: 'USER',
        enum: ['USER', 'ADMIN'],
    }
});
const modeloUsuario = model("User", userSchema);
 module.exports = modeloUsuario;;

