
//require ->
const fs = require('fs')

var config_data = null;

if (fs.existsSync(__dirname +"/../../config/config.prod.json")) { 
  config_data = require(__dirname +"/../../config/config.prod.json");
} 
else if (fs.existsSync('./../src/config/config.dev.json')) { 
  config_data = require('./../../config/config.dev.json');
}

async function Get(req, res) {
    ///config
     res.send('<!DOCTYPE html>     <html lang="pt-br">     <head>         <meta charset="UTF-8">         <meta name="viewport" content="width=device-width, initial-scale=1.0"><title>O jogo da Deusa da colheita 🌽</title>       </head>     <body>         <h1>O jogo da Deusa da colheita 🌽</h1>     </body>     </html>');
}

async function Post(req, res) {
    ///config
    var _response = {};
    var status = 400;
    
    try {
        const req_body = req.body;
        var valido = false;
        
        if(typeof req_body.user != "undefined"){
            if(typeof req_body.password != "undefined"){
                if(typeof req_body.dbname != "undefined"){
                    //console.log('Body é valido');
                    valido = true;
                }
            }
        }

        //TODO verificar se já existe as informações
        if(config_data == null){
            console.error('banco não está configurado');
            await fs.writeFile(__dirname +"/../../config/config.prod.json",JSON.stringify(req_body), function(erro) {

                if(erro) {
                    throw erro;
                }
                console.log("Arquivo salvo");
            }); 
            _response = {"Resultado":"Sucesso"};
            valido = true;
        }
        else{
            console.error('banco já está configurado');
            _response = {"Resultado":"ERRO -> critica","erro":"banco já está configurado"};

            valido = false;
        }

        if(valido){
            status = 200;
        }


    } catch (error) {
        console.log('ERRO:' + error);
        var status = 418;
        _response = {"Resultado":"ERRO","erro":error};

    }

    res.status(status).json(_response);
}

module.exports = {Get, Post};