
//require ->
const path = require('path');
const hash = require("./../../../model/Hash.js");

function New(req, res) {
    //jogo/:Sistema/New
    var _sistema = req.params.Sistema;
    var _operacao = arguments.callee.name;

    try {
        var _valorHash = hash.gerarChaveHash();
        var _response = {HASH: _valorHash};
        
        console.log('Sistema: '+ _sistema + ' Operacao '+ _operacao + ' Hash '+ _valorHash);

        // Logger.log('Movimentos',_sistema,_operacao,_user,req.params, _response);
        res.status(200).json(_response);
    } catch (erroe) {

        var _response = {error:erroe};
        // Logger.erro('Movimentos',_sistema,_operacao,_user,req.params, _response);
        res.status(500).json(_response);
    }
}

function Get(req, res) {
    //jogo/:Sistema/:User
    var _user = req.params.User;
    var _sistema = req.params.Sistema;
    
    var _operacao = arguments.callee.name;
    try {
        //Busca os dados no banco.
    
        var _response = {response:'GET'};
       
        // Logger.log('Movimentos',_sistema,_operacao,_user,req.params, _response);

        res.status(200).json(_response);

    } catch (erroe ) {
        var _response = {error:erroe};
        
        Logger.erro('Movimentos',_sistema,_operacao,_user,req.params, _response);
        res.status(500).json({error:erroe});
    }
}

function Put_menor(req, res) {
    //jogo/:Sistema/:User/Menor
    var _user = req.params.User;
    var _sistema = req.params.Sistema;
    
    var _operacao = arguments.callee.name;

}

function Put_maior(req, res) {
    //jogo/:Sistema/:User/Maior
    var _user = req.params.User;
    var _sistema = req.params.Sistema;
    
    var _operacao = arguments.callee.name;
}

function Post(req, res) {
    //jogo/:Sistema/:User
    var _user = req.params.User;
    var _sistema = req.params.Sistema;
    
    var _operacao = arguments.callee.name;
}

module.exports = {New, Get, Put_menor, Put_menor, Put_maior, Post};