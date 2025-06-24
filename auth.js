const jwt = require('jsonwebtoken'); // ✅ Utilisation de JWT pour sécuriser les tokens
const SECRET_KEY = 'mon_super_secret_key'; // Clé secrète pour signer les tokens
// La clé ne doit pas être exposée directement mais dans le cadre de ce tp,
// je ne voulais pas ajouter de .env pour trop complexifier le projet

const users = require('./controllers/userController').users;

// Auth middleware refactorisé pour utiliser JWT au lieu de string "token-username"
// et renommage de fonction
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    // message d'erreur amélioré
    if (!authHeader) return res.status(401).json({ message: 'No token provided.' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token.' });

        const user = users.find(u => u.id === decoded.id);
        if (!user) return res.status(401).json({ message: 'User not found.' });

        req.user = user;
        next();
    });
};

module.exports = authenticate;
