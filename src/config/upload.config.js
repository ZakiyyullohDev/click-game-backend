const path = require('path');
const fs = require('fs');

const PROFILE_IMAGE_SIZE = 15 * 1024 * 1024; // 15MB
const PROFILE_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const UPLOAD_FOLDER = path.join(process.cwd(), 'uploads');
const UPLOAD_IMG_NAME = 'user_img';
const UPLOAD_BRANCH_IMG_NAME = 'branch_img';

if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER);
}

const UPLOAD_FOLDER_FUNC = (user) => {
    return path.join(UPLOAD_FOLDER, user);
};

module.exports = {
    PROFILE_IMAGE_SIZE,
    PROFILE_IMAGE_TYPES,
    UPLOAD_FOLDER,
    UPLOAD_IMG_NAME,
    UPLOAD_BRANCH_IMG_NAME,
    UPLOAD_FOLDER_FUNC,
};
