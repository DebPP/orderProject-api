const mongoose = require('mongoose');


const Comanda = new mongoose.Schema({
    comandaId: {
        type: String,
        require: true
    },
    itensId: {
        type: [String],
        require: true
    },
    mesa:{
        type: String,
        require: true
    },
    confirmado: {
        type: Boolean,
        default: false
    },
    total: {
        type: Number,
        require: true
    },
    observacao: {
        type: String,
        require: false
    }
},
{
    timestamps: true,
});

mongoose.model('comanda', Comanda);
