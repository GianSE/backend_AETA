const express = require('express')
const router = express.Router()
const checkToken = require('../middleware/checkToken')
const usuarioController = require('../controller/usuarioController')

// Rota privada
router.get('/me', checkToken, usuarioController.getUsuarioLogado)

// Rotas públicas
router.post('/register', usuarioController.registerUsuario)
router.post('/login', usuarioController.loginUsuario)
router.get('/all', usuarioController.listUsuarios)
router.get('/:id', usuarioController.getUsuarioById)
router.patch('/:id', usuarioController.updateUsuario)
router.delete('/:id', usuarioController.deleteUsuario)


module.exports = router
