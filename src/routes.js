const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const secret = 'wilsontools';

const AnnotationController = require('./controllers/AnnotationController');
const PriorityController = require('./controllers/PriorityController');
const UserController = require('./controllers/UserController');

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).end();
        req.userId = decoded.userId;
        next();
    })
}

//Rota Annotations
routes.post('/annotations', verifyJWT, AnnotationController.create);
routes.get('/annotations', verifyJWT, AnnotationController.read);
routes.delete('/annotations/:id', verifyJWT, AnnotationController.delete);
routes.put('/annotations/:id', verifyJWT, AnnotationController.update);

//Rota Priority
routes.get('/priorities', verifyJWT, PriorityController.read);
routes.put('/priorities/:id', verifyJWT, PriorityController.update);

//Rota User
routes.post('/users', UserController.create);
routes.post('/users/login', UserController.login);
routes.post('/users/logout', verifyJWT, UserController.logout);

module.exports = routes;