const { error } = require('../config/error.names');
const { verifyJwtToken } = require('../lib/jwt');
const { uniqRow } = require('../lib/pg');

async function authorizationMiddleware(req, res, next) {
    try {
        const authorization = req.headers.authorization;

        if (!req.headers || !authorization) {
            return res.status(401).json({
                status: 401,
                error: error.AUTHORIZATION_ERROR,
                message: 'header da authorization majburiy',
            });
        }

        const token = await verifyJwtToken(authorization);

        if (!token || (token.status && token.status == 402)) {
            return res.status(401).json({
                status: 401,
                error: error.AUTHORIZATION_ERROR,
                message: `Authorization da hatolik`,
            });
        }

        const query = `
        select
        user_id
        from users 
        where user_id = $1
        `;
        const user = await uniqRow(query, token.id);
        if (!user.rows.length) {
            console.log('asdasd query');
            
            return res.status(401).json({
                status: 401,
                error: error.AUTHORIZATION_ERROR,
                message: `Authorization da hatolik`,
            });
        }

        next();
    } catch (error) {}
}

module.exports = authorizationMiddleware