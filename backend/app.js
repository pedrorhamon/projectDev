const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const rotaProjeto = require('./routes/projeto');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requrested-With, Content-Type, Accept, Authorization'
        );

        if(req.method =='OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET');
            return res.status(200).send({});
        }
        next();
});

app.use('/projeto', rotaProjeto);

app.use((req,res,next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res,next) => {
    res.status(error.status || 500);
   return res.send({
    erro:{
        mensagem: error.message
    }
   })
});

module.exports = app;