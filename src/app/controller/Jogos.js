
//require ->
const path = require("path");
const user = require("./../model/User.js");
const conn = require("./../../../model/Conn.js");
const game = require("./../model/Jogo.js");
const { urlencoded } = require("body-parser");

var _response = {};

async function New(req, res) {
    //jogo/:Sistema/New
    var _sistema = req.params.Sistema;
    var _operacao = arguments.callee.name;

    var _response = {};
    try {
        const Conn = new conn();
        await Conn.connect();

        var User = new user();
        var Game = new game();

        Game.setNum_atual(await Game.gerarNumero())
        console.log(Game.getNum_atual());
        
        User.setGame(Game);
        User.setHash(await User.write(Conn));

        console.log('Sistema: '+ _sistema + ' Operacao '+ _operacao + ' Hash '+  User.getHash());
        // Logger.log('Movimentos',_sistema,_operacao,_user,req.params, _response);
        
        _response = {User: User.toJSON()};
        await Conn.close();
        
        res.status(200).json(_response);

    } catch (erroe) {
        console.error('Não foi possivel criar o registro' + erroe);

        _response = {error:erroe};
        // Logger.erro('Movimentos',_sistema,_operacao,_user,req.params, _response);
        res.status(500).json(_response);
    }
}

async function Get(req, res) {
    //jogo/:Sistema/:User
    var _user = req.params.User;
    var _sistema = req.params.Sistema;
    
    var _operacao = arguments.callee.name;
    try {
        const Conn = new conn();
        await Conn.connect();
        //Busca os dados no banco.
        var User = await new user(_user,Conn);
        await User.read(Conn);
        
        //--console.log(await User.Game.numeroNovo());
        
        //Retorna o status o ultimo jogo e o numero
        _response = {USER:User};

        // Logger.log('Movimentos',_sistema,_operacao,_user,req.params, _response);
        res.status(200).json(_response);
        await Conn.close();
        console.log('Sistema: '+ _sistema + ' Operacao '+ _operacao + ' Hash '+  User.getHash());
    } catch (error) {
        console.error('Não foi possivel criar o registro' + error);
        
        _response = {error:error};
        // Logger.erro('Movimentos',_sistema,_operacao,_user,req.params, _response);
        res.status(500).json({error:error});
    }
}

async function Get_menor(req, res) {
    //jogo/:Sistema/:User/Menor
    var _user = req.params.User;
    var _sistema = req.params.Sistema;
    
    var _operacao = arguments.callee.name;
    try {
        const Conn = new conn();
        await Conn.connect();

        var _opcaoJogador = 'MENOR';

        var User = new user(_user);
        await User.read(Conn);
        
        //TODO verifica se o jogo ainda é valido...

        await User.Game.numeroNovo();
        
        var saida = await User.Game.verificarOpcao(_opcaoJogador);
        if (saida){
            await User.aumentarPontos();
        }else{
            console.log('%c Oh my LOSER! ', 'background: #222; color: #bada55');
        } 

        //Update
        await User.update(Conn);
        
        await Conn.close();
        _response = {USER:User};
        res.status(200).json(_response);

    } catch (error) {
        console.error('Não foi possivel criar o registro ' + error);

        var _response =await {error:error};
        // Logger.erro('Movimentos',_sistema,_operacao,_user,req.params, _response);
        res.status(500).json({error:error});
    }

    console.log('Sistema: '+ _sistema + ' Operacao '+ _operacao + ' _user '+ _user);
}

async function Get_maior(req, res) {
    //jogo/:Sistema/:User/Maior
    var _user = req.params.User;
    var _sistema = req.params.Sistema;
    
    var _operacao = arguments.callee.name;
    try {
        const Conn = new conn();
        await Conn.connect();

        var _opcaoJogador = 'MAIOR';

        var User = new user(_user);
        await User.read(Conn);
        
        //TODO verifica se o jogo ainda é valido...

        await User.Game.numeroNovo();
        
        var saida = await User.Game.verificarOpcao(_opcaoJogador);
        if (saida){
            await User.aumentarPontos();
        }else{
            console.log('%c Oh my LOSER! ', 'background: #222; color: #bada55');
        } 

        //Update
        await User.update(Conn);
        
        await Conn.close();
        _response = {USER:User};
        res.status(200).json(_response);

    } catch (error) {
        console.error('Não foi possivel criar o registro ' + error);

        var _response =await {error:error};
        // Logger.erro('Movimentos',_sistema,_operacao,_user,req.params, _response);
        res.status(500).json({error:error});
    }

    console.log('Sistema: '+ _sistema + ' Operacao '+ _operacao + ' _user '+ _user);

}

async function Post(req, res) {
    //jogo/:Sistema/:User
    var _user = req.params.User;
    var _sistema = req.params.Sistema;
    
    var _operacao = arguments.callee.name;
    try {
        //TODO Log informativo do sistema.
        const Conn = new conn();
        await Conn.connect();

        var User = new user(_user);
        await User.read(Conn);
        
        var nomePost = req.body.nome;

        await User.setNome(nomePost);

        //Update
        await User.update(Conn);
        
        await Conn.close();
        _response = {USER:User};
        res.status(200).json(_response);

    } catch (error) {
        console.error('Não foi possivel criar o registro ' + error);

        var _response =await {error:error};
        // Logger.erro('Movimentos',_sistema,_operacao,_user,req.params, _response);
        res.status(500).json({error:error});
    }

    console.log('Sistema: '+ _sistema + ' Operacao '+ _operacao + ' _user '+ _user);
}

module.exports = {New, Get, Get_menor, Get_maior, Post};