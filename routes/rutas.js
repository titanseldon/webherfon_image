const fs        = require('fs');
const express   = require('express');
const router    = express.Router();
const path      = require('path');

router.get('/', (req, res) => {
    res.send('Esta es la página Home');
});

router.get('/imagenes', (req, res) => {
    fs.readdir(path.join(__dirname, '../public/images'), (err, nombresImagenes) => {
        for( nombreImagen of nombresImagenes){
            console.log(`Archivos : ${nombreImagen}`);
        }
        res.render('imagenes.pug', {nombresImagenes : nombresImagenes});
    });
});

module.exports = router;

router.get('/imagen/:nombreimagen', (req, res) => {
    let nombreImagen = req.params.nombreimagen;
    fs.stat(path.join(__dirname, '../public/images/' + nombreImagen), (err, stats) => {
        console.log('Datos de la Imagen');
        console.log(stats);
        res.render('imagen.pug', {nombreImagen : nombreImagen, stats : stats});
    });
});

router.get('/eliminar/:nombreimagen', (req, res) => {
    let nombreimagen = req.params.nombreimagen;

    fs.unlink(path.join(__dirname, '../public/images/' + nombreimagen), (err) => {
        if(err) throw err;
        console.log('El archivo fué eliminado');
        res.render('eliminar.pug', {nombreimagen : nombreimagen});
    });
});