function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).send('Token manquant');
        return;
    }

    const token = authHeader.split(' ')[1];

    if (token.startsWith('token-')) {
        req.user = { username: token.slice(6) };
        next();
    } else {
        res.status(403).send('Token invalide');
    }
}

module.exports = auth;
