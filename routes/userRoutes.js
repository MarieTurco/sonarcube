const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');
const auth = require('../auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, (req, res) => {
    res.send(`Bienvenue, ${req.user.username}`);
});

module.exports = router;
