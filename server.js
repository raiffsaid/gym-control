const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override');

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.static('public')); // Define a pasta como raíz para os arquivos estáticos (imagens, CSS, JS)
server.use(methodOverride('_method')); // Usado para sobrescrever métodos dos forms
server.use(routes);

server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
});

server.listen(5000, () => {
    console.log('server is running');
});