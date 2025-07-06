const { returnResponse } = require('../../lib/express.function');
const AuthModel = require('./auth.model');

const AuthCtrl = {
    authRegister: async function (req, res) {
        try {
            const model = await AuthModel.authRegister(req.body);
            
            return res.status(201).json(model);
        } catch (error) {
            returnResponse(res, error.status, error.message, error.error)
        }
    },
    authLogin: async function (req, res) {
        try {
            const model = await AuthModel.authLogin(req.body);
            
            return res.status(200).json(model);
        } catch (error) {
            returnResponse(res, error.status, error.message, error.error)
        }
    },
}

module.exports = AuthCtrl