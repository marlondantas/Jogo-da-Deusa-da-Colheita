//#Criar o servidor!

//require ->
const express = require('express');
const cors = require('cors');
const bodyparse = require('body-parser');

const path = require('path');

//-Rotas ->
const config = require('./routes/Config.js');
const jogos = require('./routes/Jogo.js');
const interface = require('./routes/Interface.js');

//run ->
const app = express();

//CONFIG ->
app.use(cors({origin:true}))
    .use(bodyparse.json())
    .use(bodyparse.urlencoded({extended: false}))
    //.get('*',(_,res) => res.status(404).json({success:false, data: "Endpoint not found"}));
    .use(express.static("public"));

//Menu princial
app.use('/',jogos);
app.use('/',interface);
app.use('/',config);


module.exports = app;

