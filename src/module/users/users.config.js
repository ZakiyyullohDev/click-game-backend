const { returnResponse } = require('../../lib/express.function');
const { uniqRow } = require('../../lib/pg');

function checkUserSms(text) {
    if (text != '1' && text != '2' && text != '1,2') {
        return false;
    }

    return true;
}

async function createUserPasswordValidation(req, res, next) {
    const { user_is_admin, user_username, user_password } = req.body;

    if (user_is_admin && user_is_admin === 'true' && !user_username) {
        return returnResponse(res, 403, 'user_username: Field is required', 'VALIDATION_ERROR');
    } else if (user_is_admin && user_is_admin === 'true' && !user_password) {
        return returnResponse(res, 403, 'user_password: Field is required', 'VALIDATION_ERROR');
    }

    next();
}

async function updateUserPasswordValidation(req, res, next) {
    const { user_is_admin, user_username, user_password } = req.body;
    const { user_id } = req.params;

    const findUser = await uniqRow('select * from users where user_id = $1', user_id);

    if (user_is_admin && user_is_admin === 'true' && !user_username) {
        return returnResponse(res, 403, 'user_username: Field is required', 'VALIDATION_ERROR');
    } else if (
        user_is_admin &&
        user_is_admin === 'true' &&
        (findUser.rows.length && findUser.rows[0].user_password ? false : true) &&
        !user_password
    ) {
        return returnResponse(res, 403, 'user_password: Field is required', 'VALIDATION_ERROR');
    }

    next();
}

function checkAddresses(req, res, next) {
    const { region_id, province_id, street_id } = req.body;

    if ((region_id && province_id && street_id) || (!region_id && !province_id && !street_id)) {
        next();
    } else {
        res.status(403).json({
            status: 403,
            error: 'ADDRESS_NOT_FOUND',
            message: "Hudud to'liq kiritilmagan",
        });
    }
}

module.exports = {
    checkUserSms,
    checkAddresses,
    createUserPasswordValidation,
    updateUserPasswordValidation,
};
