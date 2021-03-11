const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const http = require('http');
const querystring = require('querystring');
require("./model/Products");
require("./model/Comanda");

const Products = mongoose.model('products');
const Comanda = mongoose.model('comanda');

const app = express();

app.use(express.json());

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    app.use(cors());
    next();
})

mongoose.connect('mongodb://localhost/projectApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('conexão com banco ok');
}).catch((erro) => {
    console.log('erro na conexão com mongodb');
});

app.get("/", (req, res) => {
    return res.json({
        titulo: "como criar api aaaaaaaaaaaaaa"
    })
});

app.get("/products", (req, res) => {
    Products.find({}).then((products) => {
        return res.json(products);
    }).catch((erro) => {
        return res.status(400).json({
            erro: true,
            message: "Nenhum arquivo encontrado"
        })
    })
});

app.get("/product/:id", (req, res) => {
    Products.findOne({ _id: req.params.id }).then((products) => {
        return res.json(products)
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum produto encontrado"
        })

    });
});

app.post("/products", cors(), (req, res) => {
    const products = Products.create(req.body, (err) => {
        if (err) return res.status(400).json({
            erro: true,
            message: "Erro: Produto não foi cadastrado"
        })
        return res.status(200).json({
            erro: false,
            message: "Produto cadastrado com sucesso"
        })
    })
});

app.post("/comanda", (req, res) => {
    const comanda = Comanda.create(req.body, (err) => {
        if (err) return res.status(400).json({
            erro: true,
            message: "Erro: Comanda não foi cadastrada"
        })

        var post_options = {
            host: 'closure-compiler.appspot.com',
            port: '80',
            path: '/comanda',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };

        //Store chunks
        var response = "";
        // Set up the request
        var post_req = http.request(post_options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                response += chunk;
                console.log('Response: ' + chunk);
            });
            res.on('end', function () {
                //resolve on end event
                resolve(response);
            });
            res.on('error', function (error) {
                //reject on error event
                reject(error);
            });
        });

        // post the data
        post_req.end();


        return res.status(200).json({
            erro: false,
            message: "Comanda cadastrada com sucesso",
            item: req.body,
            teste: post_req
        })

    })
});

app.get("/comanda/:id", cors(), (req, res) => {
    Comanda.findOne({ comandaId: req.params.id }).then((comanda) => {
        return res.json(comanda)
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhuma comanda encontrada"
        })

    });
});

app.listen(8080, () => {
    console.log('servidor iniciado porta 8080');
})

