'use strict';
module.exports = function(app) {
  var users = require('../controllers/userController');
  var pets = require('../controllers/petController');

 
  var training = require('../controllers/trainingController');
  var upload = require('../models/photoModel').photos();

  var photoRoutes = require('photoRoutes');

  console.log(upload)

  //app.set('view engine', 'jade');

  app.get('/api/users',users.list);
  app.post('/api/users',users.newUser);
  app.get('/api/user/:email', users.getOne);
  app.put('/api/user/:email',users.editUser); 
  app.delete('/api/user/:email', users.deleteOne);
  // Pets
  app.get('/api/pets',pets.list);
  app.post('/api/pets', pets.newPet);
  app.get('/api/pet/:owner/:name', pets.getOne);
  app.put('/api/pets/:owner/:name', pets.editPet)
  app.delete('/api/pet/:owner/:name', pets.deleteOne);

  // TRAININGS//
  app.get('/api/trainings', training.list);
  app.post('/api/trainings', training.newTraining);


 app.use('/api/photos', photoRoutes)
}

