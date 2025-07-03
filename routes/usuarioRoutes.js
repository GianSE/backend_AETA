const express = require('express');
const router = express.Router();
const checkToken = require('../middleware/checkToken');
const checkRole = require('../middleware/checkRole');
const usuarioController = require('../controller/usuarioController');

// Rotas públicas
router.post('/register', usuarioController.registerUsuario);
router.post('/login', usuarioController.loginUsuario);

// Rotas protegidas
router.get('/me', checkToken, usuarioController.getUsuarioLogado);
router.get('/all', checkToken, checkRole(['admin', 'coordenador']), usuarioController.listUsuarios);
router.get('/:id', checkToken, checkRole(['admin', 'coordenador']), usuarioController.getUsuarioById);
router.patch('/:id', checkToken, checkRole(['admin']), usuarioController.updateUsuario);
router.delete('/:id', checkToken, checkRole(['admin']), usuarioController.deleteUsuario);

module.exports = router;