//# Inicia o projeto
//Import
const app = require('./src/app/server');

var port = process.env.PORT || 3000;
//run
app.listen(port, ()=>
{
    console.log('The magic port: http://localhost:'+port)
});
