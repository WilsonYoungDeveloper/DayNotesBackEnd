const express = require('express');
const routes = express.Router();

const AnnotationController = require('./controllers/AnnotationController');
const PriorityController = require('./controllers/PriorityController');

//Rota Annotations
routes.post('/annotations', AnnotationController.create);
routes.get('/annotations', AnnotationController.read);
routes.delete('/annotations/:id', AnnotationController.delete);
routes.put('/annotations/:id', AnnotationController.update);

//Rota Priority
routes.get('/priorities', PriorityController.read);
routes.put('/priorities/:id', PriorityController.update);


module.exports = routes;