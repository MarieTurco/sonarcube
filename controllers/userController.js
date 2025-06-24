const { validationResult } = require('express-validator'); // Validation des entrées utilisateur
const bcrypt = require('bcryptjs'); // hashage mot de passe
const { generateToken } = require('../utils'); // génération sécurisée de token

const users = [];


// Fonction refactorisée pour améliorer la lisibilité et supprimer duplications
function register(req, res) {
    // Controle des erreurs en entrée
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // ✅ Validation des champs

    const { username, password, email } = req.body;

    // Remplacement de la boucle for par Array.find()
    const existingUser = users.find(u => u.username === username || u.email === email);
    if (existingUser) return res.status(409).json({ message: 'User already exists.' });

    // Hachage du mot de passe
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword,
    };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully.' });
};

function login(req, res) {
    // Controle des erreurs en entrée
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // ✅ Validation des champs

    const { username, password } = req.body;

    const user = users.find(u => u.username === username); // Remplacement de boucle par Array.find()

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials.' }); // Meilleur message d'erreur
    }

    // Utilisation de JWT sécurisé
    const token = generateToken(user);
    res.json({ token });
}

module.exports = {
    register,
    login
};
