var colors  = require('colors');
const fs    = require('fs');
const path  = require('path');

const express       = require('express');
const app           = express();

app.use(express.static('public'));
app.use(require('./routes/rutas'));

app.set('view engine', 'pug');
app.set('views', './views');
app.set('port', 4000);

app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en el puerto : '.magenta, app.get('port'));
});

fs.watch(path.join(__dirname, './public/images'), (eventType, filename) => {
    console.log('\nArchivo modificado : ', filename);    
    console.log('\nTipo de cambio : ', eventType);
});