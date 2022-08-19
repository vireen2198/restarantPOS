const jwt = require('jsonwebtoken'),
settings = require('./config/config');
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSID=process.env.TWILIO_SERVICE_TOKEN;
const client = require('twilio')(accountSid, authToken);
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
    async twilioSendSms(phoneNumber){
            try {
                const data=await client.verify.v2.services(serviceSID)
                .verifications
                .create({to: phoneNumber, channel: 'whatsapp'});
                return 
            } catch (error) {
                console.log(error)
                  throw new Error(error.message)
            }

    },
    async twilioVerifyPhoneNumber(params){
        try {
            const data=await client.verify.services(serviceSID)
            .verificationChecks
            .create({to: params.phoneNumber, code:params.code});
            if(data.status.toLowerCase()!=="approved" || data.valid===false)throw new Error("invalid tac code")
            return data    
        } catch (error) {
            throw new Error(error.message);
        }

    },

}