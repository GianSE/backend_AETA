// controller/usuarioController.js

const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Pet = require('../models/Pet');
require('dotenv').config();

// ... (outras funções do controlador existentes)

exports.getUsuarioLogado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.userId, '-password');
        if (!usuario) return res.status(404).json({ msg: 'Usuário não encontrado' });

        // Adicionando o usuário ao objeto req para uso em outros middlewares
        req.user = usuario;

        res.status(200).json({ user: usuario });
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao buscar usuário autenticado' });
    }
};

exports.registerUsuario = async (req, res) => {
    if (!req.body) return res.status(422).json({ error: 'Corpo inválido' });

    const { name, email, password, phone, role } = req.body;

    if (!name) return res.status(422).json({ error: 'Nome é obrigatório' });

    try {
        // Verifica se o e-mail já está cadastrado
        const existingUser = await Usuario.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'E-mail já está em uso' });
        }

        // Se um papel for fornecido e não for um dos permitidos, defina como 'usuario'
        const allowedRoles = ['admin', 'coordenador', 'usuario'];
        const userRole = role && allowedRoles.includes(role) ? role : 'usuario';

        const usuario = { name, email, password, phone, role: userRole };
        await Usuario.create(usuario);

        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(422).json({ error: 'Email e senha são obrigatórios!' });

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario || usuario.password !== password)
            return res.status(401).json({ error: 'Credenciais inválidas' });

        const token = jwt.sign({ id: usuario._id, role: usuario.role }, process.env.SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: 'Login realizado com sucesso!', id: usuario._id, name: usuario.name, token });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.listUsuarios = async (req, res) => {
    const { name, phone } = req.query;
    const filter = {};

    if (name) filter.name = { $regex: new RegExp(name, 'i') };
    if (phone) filter.phone = { $regex: new RegExp(phone, 'i') };

    try {
        const usuarios = await Usuario.find(filter);
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: error });
    }
};

exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ _id: req.params.id });
        if (!usuario) return res.status(422).json({ message: 'Usuário não encontrado' });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ erro: error });
    }
};

exports.updateUsuario = async (req, res) => {
    const { name, email, password, phone, role } = req.body;
    const update = { name, email, password, phone, role };

    try {
        const updated = await Usuario.findOneAndUpdate({ _id: req.params.id }, update, { new: true });
        if (!updated) return res.status(422).json({ message: 'Usuário não encontrado' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ erro: error });
    }
};

exports.deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ _id: req.params.id });
        if (!usuario) return res.status(422).json({ message: 'Usuário não encontrado' });

        // Deletar todos os pets associados ao usuário
        await Pet.deleteMany({ user: usuario._id });

        // Agora deletar o usuário
        await Usuario.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'Usuário e pets removidos com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: error });
    }
};