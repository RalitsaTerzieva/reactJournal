import AuthController from '../controllers/AuthController'
import EntryController from '../controllers/EntryController'

export default (app) => {
  app.post('/register', AuthController.register);
  app.post('/login', AuthController.login);
  app.post('/entries/create', EntryController.createEntry);
  app.get('/entries/:id', EntryController.showEntry);
  app.delete('/entries/:id', EntryController.deleteEntry);
  app.get('/entries', EntryController.listEntries);

// Create a catch-all route for testing the installation.
app.all('*', (req, res) => res.status(404).send({
  message: 'Not found!',
}));
};