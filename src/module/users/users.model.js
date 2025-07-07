const path = require('path');
const fs = require('fs');

const { HttpException } = require('../../lib/httpException');
const imagekit = require('../../config/imagekit.config');
const { error } = require('../../config/error.names');
const { verifyJwtToken } = require('../../lib/jwt');
const { uniqRow } = require('../../lib/pg');

const UsersModel = {
    getMeByToken: async function (token) {
        const userId = await verifyJwtToken(token).id;
        
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
        
        const checkUser = await uniqRow(usersQuery, userId);
        
        if (!checkUser.rows[0]) {
            throw new HttpException(404, 'User Not Found', error.USER_NOT_FOUND);
        }
        
        return {
            status: 200,
            message: 'User Getted Successfully',
            user: checkUser.rows[0],
        };
    },
    updateUser: async function (token, body, files) {
        const {
            user_phone_number,
            user_email,
            user_username,
            user_password,
            user_gender,
            user_birth_date
        } = body;

        const userId = await verifyJwtToken(token).id;

        const usersQuery = `
            SELECT
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
            FROM users
            WHERE user_delete = false AND user_id = $1
        `;

        const checkUser = await uniqRow(usersQuery, userId);

        if (!checkUser.rows[0]) {
            throw new HttpException(404, 'User Not Found', 'USER_NOT_FOUND');
        }

        let user_img = checkUser.rows[0].user_img;

        if (files && files.user_img) {
            if (user_img) {
                try {
                    const imgPath = new URL(user_img).pathname;
                    const fileName = imgPath.split('/').pop();

                    const result = await imagekit.listFiles({
                        searchQuery: `name="${fileName}"`
                    });

                    if (result.length > 0) {
                        await imagekit.deleteFile(result[0].fileId);
                        console.log("Oldingi rasm o'chirildi:", fileName);
                    }
                } catch (err) {
                    console.error("Rasm o‘chirishda xatolik:", err.message);
                }
            }

            const image = files.user_img;
            const tempPath = path.join(__dirname, '../../../temp_upload', image.name);
            await image.mv(tempPath);

            const fileBuffer = fs.readFileSync(tempPath);

            const uploadResult = await imagekit.upload({
                file: fileBuffer,
                fileName: `user_${userId}_${Date.now()}`,
                folder: "click_game_users"
            });

            fs.unlinkSync(tempPath);
            user_img = uploadResult.url;
        }

        const userEmail = user_email || checkUser.rows[0].user_email;
        const userUsername = user_username || checkUser.rows[0].user_username;
        const userPassword = user_password || checkUser.rows[0].user_password;
        const userGender = user_gender || checkUser.rows[0].user_gender;
        const userBirthDate = user_birth_date || checkUser.rows[0].user_birth_date;
        const userPhoneNumber = user_phone_number || checkUser.rows[0].user_phone_number;

        const updateUserQuery = `
            UPDATE users
            SET 
                user_phone_number = $2, 
                user_email = $3, 
                user_username = $4, 
                user_password = $5, 
                user_gender = $6, 
                user_birth_date = $7,
                user_img = $8
            WHERE user_id = $1
        `;

        await uniqRow(
            updateUserQuery,
            userId,
            userPhoneNumber,
            userEmail,
            userUsername,
            userPassword,
            userGender,
            userBirthDate,
            user_img
        );

        return {
            status: 200,
            message: 'User Updated Successfully'
        };
    }
};

module.exports = UsersModel;