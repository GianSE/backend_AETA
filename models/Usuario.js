const mongoose = require('mongoose');
const moment = require('moment');

const usuarioSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    role: {
        type: String,
        enum: ['admin', 'coordenador', 'usuario'],
        default: 'usuario'
    },
    createdAt: {
        type: String,
        default: () => moment().format('YYYY-MM-DD HH:mm:ss')
    },
    updatedAt: {
        type: String,
        default: () => moment().format('YYYY-MM-DD HH:mm:ss')
    }
});

// Middleware para atualizar a data antes de salvar
usuarioSchema.pre('findOneAndUpdate', function (next) {
    this._update.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    next();
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;