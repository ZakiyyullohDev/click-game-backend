const RegexUtil = require("../util/regex.util");

const updateUsersDto = {
    user_phone_number: {
        required: false,
        minLength: 1,
        maxLength: 30,
        type: 'string',
        pattern: [RegexUtil.userPhoneNumber, '998991239988']
    },
    user_email: {
        required: false,
        minLength: 13,
        maxLength: 30,
        type: 'string',
        pattern: [RegexUtil.email, 'example@example.com']
    },
    user_username: {
        required: false,
        minLength: 1,
        maxLength: 30,
        type: 'string',
    },
    user_password: {
        required: false,
        minLength: 8,
        maxLength: 32,
        type: 'string',

    },
    user_gender: {
        required: false,
        minLength: 1,
        maxLength: 30,
        type: 'string',
    },
    user_birth_date: {
        required: false,
        minLength: 1,
        maxLength: 30,
        type: 'string',
        pattern: [RegexUtil.userBirthDate, 'dd.mm.yyyy']
    },
};

module.exports = {
    updateUsersDto,
};
