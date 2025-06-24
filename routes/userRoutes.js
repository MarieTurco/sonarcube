const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/userController');

const router = express.Router();

// Validation des champs lors de l'inscription
router.post(
    '/register',
    [
        body('username').isLength({ min: 3 }),
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
    ],
    register
);

// Validation des champs lors de la connexion
router.post(
    '/login',
    [
        body('username').notEmpty(),
        body('password').notEmpty(),
    ],
    login
);

module.exports = router;
