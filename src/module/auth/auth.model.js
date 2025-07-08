const { HttpException } = require('../../lib/httpException');
const { error } = require('../../config/error.names');
const { requestJwtToken } = require('../../lib/jwt');
const { uniqRow } = require('../../lib/pg');

const domain = process.env.DOMAIN;

const AuthModel = {
    authRegister: async function (body) {
        const { user_email, user_password, user_username, user_phone_number, user_gender, user_birth_date } = body;
        
        const emailCheckQuery = `
            SELECT 
                user_id,
                user_email
            FROM users WHERE user_email = $1
        `;
        
        const checkEmail = await uniqRow(emailCheckQuery, user_email);
        if (checkEmail.rows[0]) {
            throw new HttpException(409, 'user_email already exists', error.USER_EMAIL_ALREADY_EXISTS);
        }
        
        const userNameCheckQuery = `
            SELECT 
                user_id,
                user_username
            FROM users WHERE user_username = $1
        `;
        
        const checkUserName = await uniqRow(userNameCheckQuery, user_username);
        if (checkUserName.rows[0]) {
            throw new HttpException(409, 'user_username already exists', error.USER_USERNAME_ALREADY_EXISTS);
        }
        
        const phoneNumberCheckQuery = `
            SELECT 
                user_id,
                user_phone_number
            FROM users WHERE user_phone_number = $1
        `;
        
        const checkPhoneNumber = await uniqRow(phoneNumberCheckQuery, user_phone_number);
        if (checkPhoneNumber.rows[0]) {            
            throw new HttpException(409, 'user_phone_number already exists', error.USER_PHONE_NUMBER_ALREADY_EXISTS);
        }
        
        const createUserQuery = `
            INSERT INTO 
                users (user_email, user_password, user_phone_number, user_gender, user_birth_date) 
            VALUES ( $1, $2, $3, $4, $5 ) RETURNING *
        `;
        
        const createUser = await uniqRow(createUserQuery, user_email, user_password, user_phone_number, user_gender, user_birth_date);

        const createPlayerQuery = `
            INSERT INTO 
                players (user_id) 
            VALUES ( $1 ) RETURNING *
        `;
        
        const createPlayer = await uniqRow(createPlayerQuery, createUser.rows[0].user_id);
        
        return {
            status: 201,
            message: 'User Added Succesfully',
            user: createUser.rows[0],
        };
    },
    authLogin: async function (body) {
        const { user_email, user_phone_number, user_username, user_password } = body;
        
        if (!user_email && !user_phone_number && !user_username) {
            throw new HttpException(400, 'Email or phone number is required', error.EMAIL_PHONE_OR_USERNAME_REQUIRED,);
        }
        
        let field, value;
        
        if (user_email) {
            field = 'user_email';
            value = user_email;

        } else if (user_phone_number) {
            field = 'user_phone_number';
            value = user_phone_number;

        } else if (user_username) {
            field = 'user_username';
            value = user_username;
        }
        
        const query = `
            SELECT 
                user_id, user_email, user_phone_number, user_username, user_password
            FROM users
            WHERE ${field} = $1 AND user_password = $2
        `;
        
        const result = await uniqRow(query, value, user_password);
        
        if (!result.rows[0]) {
            throw new HttpException(401, 'Invalid login or password', error.INVALID_LOGIN_OR_PASSWORD);
        }

        const token = await requestJwtToken(result.rows[0].user_id)
        
        return {
            status: 200,
            message: 'Tizimga muvaffaqiyatli kirildi',
            token
        };
    }
};

module.exports = AuthModel;
