//# Inicia o projeto
//conectando com o banco
const conn = require('./model/Conn.js');
global.conn = new conn();

try {
    global.conn.connect();     
} catch (error) {
    console.error("Não foi possivel conectar ao servidor.");
    process.exit(1)
}

//Import
const app = require('./src/app/server');

var port = process.env.PORT || 3000;
//run
app.listen(port, ()=>
{
    console.log('The magic port: http://localhost:'+port);
});
