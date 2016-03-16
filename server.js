var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var usuarios = require('./users.json');

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: true}));

function search(term) {
  return function(usuario) {
    var nombreCompleto = usuario.nombre + ' ' + usuario.apellido;
    return (nombreCompleto.toLowerCase().indexOf(term.toLowerCase()) > -1);
  };
}

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/search', function(req, res) {
  res.json(usuarios.filter(search(req.query.q))).end();
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
