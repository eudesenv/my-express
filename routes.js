var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    console.log('I AM A CUSTOM ROUTE MIDDLEWARE');
    next();
});

router.get('/', function(req, res, next) {
    // res.json({
    //     message: 'hello world'
    // });
    next(new Error('custom error')); // simulating error
});

// -- Rotas com expressões regulares
// rota com parametros opcionais (a opcional)
// router.get('/a?r', function(req, res){
// router.get('/a+r', function(req, res){
router.get('/a*r', function(req, res){
    res.send('router a?r');
});

router.get('/params/:name', function(req, res) {
    res.json({
        params: req.params,
        host: req.hostname,
        headers: req.headers
    })
});

router.post('/body', function(req, res) {
    console.log(req.body);
    res.json(req.body);
});

router.get('/res', function(req, res) {
    // -- type text/plain
    // res.status(201).send('Eudes Ferreira');
    // -- type json
    res.status(201).json({
        name: 'Eudes',
        lastname: 'Ferreira'
    });
    // -- type template engine
    res.render('index', {
        name: 'Eudes',
        lastname: 'Ferreira'
    });
})

module.exports = router;