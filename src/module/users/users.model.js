const path = require('path');
const fs = require('fs');

// const { UPLOAD_IMG_NAME, UPLOAD_FOLDER, UPLOAD_FOLDER_FUNC } = require('../../config/upload');
// const { formatDateToCustomString } = require('../../lib/usefulfunctions');
// const { error } = require('../../config/error.names');
const { verifyJwtToken } = require('../../lib/jwt');
const { uniqRow } = require('../../lib/pg');
const { HttpException } = require('../../lib/httpException');
const { error } = require('../../config/error.names');

const domain = process.env.DOMAIN;

const UsersModel = {
    getMeByToken: async function (token) {
        const userId = await verifyJwtToken(token).id
        
        let usersQuery = `
        select
            user_id,
            user_phone_number,
            user_img,
            user_email,
            user_username,
            user_password,
            user_delete,
            user_gender,
            user_birth_date,
            user_createdat
        from users
        where 
            user_delete = false and 
            user_id = $1
        `;

        const checkUser = await uniqRow(usersQuery, userId)

        if (!checkUser.rows[0]) {
            throw new HttpException(404, "User Not Found", error.USER_NOT_FOUND)
        }

        return {
            status: 200,
            message: "User Getted Successfully",
            user: checkUser.rows[0]
        }
    }
}

module.exports = UsersModel