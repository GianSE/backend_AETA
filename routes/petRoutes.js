const router = require('express').Router()
const checkToken = require('../middleware/checkToken')
const petController = require('../controller/petController')

// Rotas protegidas
router.post('/register', checkToken, petController.createPet)
router.get('/mypets', checkToken, petController.getMyPets)
router.patch('/:id', checkToken, petController.updatePet)
router.delete('/:id', checkToken, petController.deletePet)
router.patch('/schedule/:id', checkToken, petController.scheduleVisit)
router.patch('/adopt/:id', checkToken, petController.adoptPet)

// Rotas públicas
router.get('/all', petController.getAllPets)
router.get('/:id', petController.getPetById)

module.exports = router
