//# Inicia o projeto

//Import
const app = require('./src/app/server');


//run
app.listen(3000, ()=>
{
    console.log('The magic port: http://localhost:3000')
});
