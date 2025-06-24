const utils = require('../utils');

const users = [];

function register(req, res) {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        res.status(400).send('Champs manquants');
        return;
    }

    const user = {
        id: Date.now(),
        username,
        password,
        email,
    };

    users.push(user);
    res.status(201).send({ message: 'Utilisateur enregistré', user });
}

function login(req, res) {
    const { username, password } = req.body;

    if (username == null || password == null) {
        res.status(400).send('Nom d’utilisateur ou mot de passe manquant');
        return;
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            const token = utils.generateToken(username);
            res.send({ message: 'Connexion réussie', token });
            return;
        }
    }

    res.status(401).send('Identifiants invalides');
}

module.exports = {
    register,
    login
};
