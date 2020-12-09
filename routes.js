const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    return res.redirect('instructors');
});

routes.get('/instructors', (req, res) => {
    return res.render('instructors/index');
});

routes.get('/instructors/create', (req, res) => {
    return res.render('instructors/create')
});

routes.get('/members', (req, res) => {
    return res.render('members');
});

routes.post('/instructors', (req, res) => {
    return res.send('recebido');
});

module.exports = routes;