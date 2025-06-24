const jwt = require('jsonwebtoken'); // ✅ Utilisation de JWT pour sécuriser les tokens
const SECRET_KEY = 'mon_super_secret_key'; // Clé secrète pour signer les tokens
// La clé ne doit pas être exposée directement mais dans le cadre de ce tp,
// je ne voulais pas ajouter de .env pour trop complexifier le projet

function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
        expiresIn: '1h',
    });}

module.exports = {
    generateToken
};
