//classe do jogador, código autoral
const dataNow = require("./../../../model/Datanow.js");

class User{
    constructor(_nomeJogador, _pontos, _hash){
        this.Nome_jogador = _nomeJogador;
        this.Pontos = _pontos;

        this.Hash = _hash;

        this.Classe = 'User'; 
        this.Data_movimentacao = dataNow.getDataNOW();
    }

    getNome(){
        return this.Nome_jogador;
    }

    setNome(_nomeJogador){
        this.Nome_jogador = _nomeJogador;
    }

    getPontos(){
        return this.Pontos;
    }

    setPontos(_pontos){
        this.Pontos = _pontos;
    }

    getHash(){
        return this.Hash;
    }

    setHash(_hash){
        this.Hash = _hash;
    }

    toString(){
        return this.Classe;
    }

    toJSON(){
        return {
            Data_movimentacao:this.Data_movimentacao,
            Classe:this.Classe,
            Nome_jogador: this.Nome_jogador,
            Pontos: this.Pontos,
            Hash:this.Hash
        }
    }
}
module.exports= User;
