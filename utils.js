function generateToken(user) {
    return "token-" + user + "-" + Date.now();
}

module.exports = {
    generateToken
};
