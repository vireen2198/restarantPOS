let authService = require('../services/AuthService')
let Util = require('../Util')

module.exports = {
    login: async function (req, res) {
        try {
            console.log(req.body)
            let response = await authService.login(req.body);   // TODO Refactor 6 months after April 2021 
            let token = await Util.setupTokenForJwt(response)
            res.status(200).send({ token , message:'User retrieved successfully'});
        } catch (e) {
            console.log(e.message)
            res.status(500).send({ error: true, message: e.message })
        }
    },
}