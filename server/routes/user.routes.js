const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.get('/api/users', UserController.getAll);
    app.get('/api/logout', UserController.logout);
    app.get('/api/user/:userId', UserController.findUser);
}