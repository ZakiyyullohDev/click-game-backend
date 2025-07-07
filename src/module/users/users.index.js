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

express.patch(
    '/api/users/update', 
    validationMiddleware(UsersDto.updateUsersDto, 'body'),
    authorizationMiddleware,
    UsersCtrl.updateUser
);

module.exports = express;