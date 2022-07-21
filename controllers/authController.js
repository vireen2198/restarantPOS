let authService = require('../services/AuthService')

module.exports = {
    login: async function (req, res) {
        try {
            let response = await authService.login(req.body.login);   // TODO Refactor 6 months after April 2021 
            res.status(200).send({ response, message: 'User retrieved successfully' });
        } catch (e) {
            console.log(e.message)
            res.status(500).send({ error: true, message: e.message })
        }
    },
}