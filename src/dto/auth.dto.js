const RegexUtil= require("../util/regex.util")

const authRegisterDto = {
    user_email: {
        required: true,
        minLength: 12,
        maxLength: 32,
        type: 'string',
        pattern: [RegexUtil.email]
    },
    user_password: {
        required: true,
        minLength: 8,
        maxLength: 32,
        type: 'string',
    },
    user_phone_number: {
        required: true,
        minLength: 1,
        maxLength: 30,
        type: 'string',
        pattern: [RegexUtil.userPhoneNumber]
    },
    user_gender: {
        required: true,
        minLength: 1,
        maxLength: 30,
        type: 'string',
        pattern: [RegexUtil.user_gender]
    },
    user_birth_date: {
        required: true,
        minLength: 1,
        maxLength: 30,
        type: 'string',
        pattern: [RegexUtil.userBirthDate]
    },
};

const authLoginDto = {
    user_email: {
        required: false,
        minLength: 12,
        maxLength: 32,
        type: 'string',
        pattern: [RegexUtil.email]
    },
    user_username: {
        required: false,
        minLength: 8,
        maxLength: 32,
        type: 'string',
    },
    user_phone_number: {
        required: false,
        minLength: 1,
        maxLength: 30,
        type: 'string',
        pattern: [RegexUtil.userPhoneNumber]
    },
    user_password: {
        required: true,
        minLength: 8,
        maxLength: 32,
        type: 'string',
    }
};

module.exports = {
    authRegisterDto,
    authLoginDto
};