const validationMiddleware = require('../../middleware/validation.middleware');
const UsersDto = require('../../dto/users.dto');
const UsersCtrl = require('./users.ctrl');
const authorizationMiddleware = require('../../middleware/authorization.middleware');

const express = require('express').Router();

express.get(
    '/api/users/me', 
    authorizationMiddleware,
    UsersCtrl.getMeByToken
);

module.exports = express;