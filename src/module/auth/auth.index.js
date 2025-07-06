const validationMiddleware = require('../../middleware/validation.middleware');
const AuthDto = require('../../dto/auth.dto');
const AuthCtrl = require('./auth.ctrl');

const express = require('express').Router();

express.post(
    '/api/auth/register', 
    validationMiddleware(AuthDto.authRegisterDto, 'body'),
    AuthCtrl.authRegister
);

express.post(
    '/api/auth/login', 
    validationMiddleware(AuthDto.authLoginDto, 'body'),
    AuthCtrl.authLogin
);

module.exports = express;
