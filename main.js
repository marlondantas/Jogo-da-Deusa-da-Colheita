//# Inicia o projeto

//Import
const app = require('./src/app/server');


//run
app.listen(process.env.PORT || 3000, ()=>
{
    console.log('The magic port: http://localhost:'+process.env.PORT || 3000)
});
