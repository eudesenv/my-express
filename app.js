var express = require('express');
var app = express();
var path    = require('path');
//var http = require('http');
var routes = require('./routes');

app.set('view engine', 'pug'); // setting template engine pug

// -- middleware com callback function (um custom middleware deve estar acima das declarções de rota)
app.use(function(req, res, next) {
    req.name = 'eudesenv'; // customizing request with middleware
    console.log('I AM A CUSTOM middleware!');
    next(); // callback para avançar a requisição
});


app.get('/', function(req, res) {
    res.render('index', { message: 'Hello world from ExpresJs By ' + req.name });
    // res.send('Hello world from ExpresJs By ' + req.name);
});

app.get('/world', function(req, res) {
    res.json({message : 'World'});
});

// método use é considerado com um adiçãoo de um middleware (nesse exemplo um de rotas)
// dentro da instância do aplicativo
// o /hello é como um group das rotas que estão configuradas no routes.js
app.use('/hello', routes);


// servindo arquivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// -- handle error middleware (middleware de error deve estar no final de todos outras configs)
app.use(function(err, req, res, next) {
    res.status(500)
        .json({
            message: 'Something wrong happens'
        });
});

// --- VIA express instance
app.listen(3000, function() {
    console.log('Express Started');
});

// --- VIA Http Node
// http.createServer(app).listen(3000, function(){
//     console.log('Express started');
// });



