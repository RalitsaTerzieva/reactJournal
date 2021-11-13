import AuthController from '../controllers/AuthController'

export default (app) => {
  app.post('/register', AuthController.register);
  app.post('/login', AuthController.login);

// Create a catch-all route for testing the installation.
app.all('*', (req, res) => res.status(200).send({
  message: 'Hello World!',
}));
};