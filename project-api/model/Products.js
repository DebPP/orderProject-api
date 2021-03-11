const mongoose = require('mongoose');

const Products = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    description:{
        type: String,
        require: false
    },
    img:{
        type: String,
        require: true
    },
},
{
    timestamps: true,
});

mongoose.model('products', Products);