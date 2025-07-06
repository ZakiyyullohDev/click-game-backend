const UsersModel = require('./users.model');

const UsersCtrl = {
    getMeByToken: async function (req, res) {
        const model = await UsersModel.getMeByToken(req.headers.authorization);

        return res.status(200).json(model);
    },
}

module.exports = UsersCtrl