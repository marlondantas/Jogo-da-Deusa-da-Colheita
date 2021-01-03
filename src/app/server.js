//#Criar o servidor!

//require ->
const express = require('express');
const cors = require('cors');
const bodyparse = require('body-parser');

const path = require('path');

//-Rotas ->
const jogos = require('./routes/Jogo.js');

//run ->
const app = express();

//CONFIG ->
app.use(cors({origin:true}))
    .use(bodyparse.json())
    .use(bodyparse.urlencoded({extended: false}));
    //.get('*',(_,res) => res.status(404).json({success:false, data: "Endpoint not found"}));


//Menu princial
app.use('/',jogos);


module.exports = app;

