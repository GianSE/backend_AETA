const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    weight: {
        type: Number
    },
    color: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adopter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {
    timestamps: true // ✅ Isso cria createdAt e updatedAt automaticamente
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
