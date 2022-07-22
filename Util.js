const jwt = require('jsonwebtoken'),
settings = require('./config/config');

module.exports = {
    setupTokenForJwt: async function (user) {
        let userForJwt = {
            '_id': user._id,
            'password': user.password,
            'username': user.username,
            'lastLogin': user.lastLogin
        }

        return jwt.sign(userForJwt, settings.secret, {
            expiresIn: 180 * 24 * 60 * 60 * 1000 // set the expiry to 90 days
        })
    },
}