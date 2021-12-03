import AuthController from '../controllers/AuthController';
import EntryController from '../controllers/EntryController';
import jwtAuth from '../middlewares/jwt';
import isAuthor from '../middlewares/isAuthorMiddleware';

export default (app) => {
    app.post('/register', AuthController.register);
    app.post('/login', AuthController.login);
    app.post('/entries', jwtAuth, EntryController.createEntry);
    app.put('/entries/:id', jwtAuth, isAuthor, EntryController.updateEntry);
    app.get('/entries/:id', jwtAuth, isAuthor, EntryController.showEntry);
    app.delete('/entries/:id', jwtAuth, isAuthor, EntryController.deleteEntry);
    app.get('/entries', jwtAuth, EntryController.listEntries);

    // Create a catch-all route for testing the installation.
    app.all('*', (req, res) => res.status(404).send({
        message: 'Not found!',
    }));
};