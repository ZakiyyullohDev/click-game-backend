const { returnResponse } = require('../../lib/express.function');
const UsersModel = require('./users.model');

const UsersCtrl = {
    getMeByToken: async function (req, res) {
        try {
            const model = await UsersModel.getMeByToken(req.headers.authorization);
            
            return res.status(200).json(model);
        } catch (error) {
            returnResponse(res, error.status, error.message, error.error)
        }
    },
    updateUser: async function (req, res) {
        try {            
            const model = await UsersModel.updateUser(req.headers.authorization, req.body, req.files);
            
            return res.status(200).json(model);
        } catch (error) {
            returnResponse(res, error.status, error.message, error.error)
        }
    },
}

module.exports = UsersCtrl