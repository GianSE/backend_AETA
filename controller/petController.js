const Pet = require('../models/Pet')

// Cadastrar pet
exports.createPet = async (req, res) => {
    const { name, age, weight, color, available } = req.body

    if (!name) return res.status(422).json({ error: 'O nome é obrigatório!' })

    const pet = new Pet({
        name,
        age,
        weight,
        color,
        available,
        user: req.userId,
        adopter: null
    })

    try {
        await pet.save()
        res.status(201).json({ message: 'Pet inserido com sucesso!' })
    } catch (error) {
        res.status(500).json({ error })
    }
}

// Listar todos os pets
exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find()
        res.status(200).json(pets)
    } catch (error) {
        res.status(500).json({ error })
    }
}

// Listar pets do usuário logado
exports.getMyPets = async (req, res) => {
    try {
        const pets = await Pet.find({ user: req.userId })
        res.status(200).json(pets)
    } catch (error) {
        res.status(500).json({ error })
    }
}

// Obter pet por ID
exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id)
        if (!pet) return res.status(422).json({ message: 'Pet não encontrado' })
        res.status(200).json(pet)
    } catch (error) {
        res.status(500).json({ error })
    }
}

// Atualizar pet
exports.updatePet = async (req, res) => {
    const id = req.params.id
    const pet = await Pet.findById(id)

    if (!pet) return res.status(404).json({ message: 'Pet não encontrado' })
    if (pet.user.toString() !== req.userId) return res.status(403).json({ message: 'Acesso negado' })

    const { name, age, weight, color, available } = req.body

    try {
        const updatedPet = await Pet.findByIdAndUpdate(
            id,
            { name, age, weight, color, available },
            { new: true }
        )
        res.status(200).json(updatedPet)
    } catch (error) {
        res.status(500).json({ error })
    }
}

// Deletar pet
exports.deletePet = async (req, res) => {
    const id = req.params.id
    const pet = await Pet.findById(id)

    if (!pet) return res.status(404).json({ message: 'Pet não encontrado' })
    if (pet.user.toString() !== req.userId) return res.status(403).json({ message: 'Acesso negado' })

    try {
        await Pet.findByIdAndDelete(id)
        res.status(200).json({ message: 'Pet removido com sucesso' })
    } catch (error) {
        res.status(500).json({ error })
    }
}

// Agendar visita
exports.scheduleVisit = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id)
        if (!pet) return res.status(404).json({ message: 'Pet não encontrado' })

        if (pet.user.toString() === req.userId)
            return res.status(422).json({ message: 'Não pode agendar para seu próprio pet' })

        if (pet.adopter) return res.status(422).json({ message: 'Pet já agendado para adoção' })

        pet.adopter = req.userId
        await pet.save()

        res.status(200).json({ message: 'Visita agendada com sucesso!' })
    } catch (error) {
        res.status(500).json({ error })
    }
}

// Concluir adoção
exports.adoptPet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id)
        if (!pet) return res.status(404).json({ message: 'Pet não encontrado' })

        if (pet.user.toString() !== req.userId)
            return res.status(403).json({ message: 'Somente o dono pode concluir a adoção' })

        if (!pet.adopter)
            return res.status(422).json({ message: 'Nenhum adotante registrado' })

        pet.available = false
        await pet.save()

        res.status(200).json({ message: 'Adoção concluída com sucesso!' })
    } catch (error) {
        res.status(500).json({ error })
    }
}
