var path = require('path');
//require ->
var _response = {};

async function Get(req, res) {
    // inicial
    res.sendFile('index.html', {root: './public'});
    //res.send('<!DOCTYPE html>     <html lang="pt-br">     <head>         <meta charset="UTF-8">         <meta name="viewport" content="width=device-width, initial-scale=1.0"><title>O jogo da Deusa da colheita 🌽</title>       </head>     <body>         <h1>O jogo da Deusa da colheita 🌽</h1>     </body>     </html>');
}

module.exports = {Get};