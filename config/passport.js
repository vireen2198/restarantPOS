const UserDao = require('../daos/authDao');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    settings = require('./config');

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = settings.secret;
    opts.passReqToCallback = true

    // passport.use('user-rule', new JwtStrategy(opts, function (req, payload, done) {
    //     console.log(payload)
    //     UserDao.findUser(payload).then(user => {
    //         console.log(user)
    //         if (user == null) {
    //             return req.res.status(401).send({ error: true, message: "Data tempered detected. Details do not match - 3" })
    //         } else {
    //             if (!user.loggedIn || user._id != payload._id || user.username != payload.username)
    //                 return req.res.status(401).send({ error: true, message: "Session Expired. Please login again." })
    //             else if (new Date(user.lastLogin).toString() != new Date(payload.lastLogin).toString())
    //                 return req.res.status(409).send({ error: true, message: "Another login has been detected. Please login again." })
    //             else if (req.baseUrl === '/admin' && !user.isAdmin)  // need to check if user is admin to access /admin path
    //                 return req.res.status(401).send({ error: true, message: "Unable to login. Please contact us for support." })
    //         }

    //         /**
    //          * Need to set these properties to the local user from the central user to be displayed on the frontend
    //          */
    //         let rUser = JSON.parse(JSON.stringify(user))
    //         rUser.password = undefined
    //         rUser.username = user.user.username

    //         return done(null, rUser)
    //     }).catch(e => {
    //         return req.res.status(409).send({ error: true, message: "User not found. Please contact us for support." })
    //     });
    // }));

    //   passport.use('headerapikey', new HeaderAPIKeyStrategy({ header: 'Authorization', prefix: 'Api-Key ' }, true, function (apiKey, done, req) {
    //     AuthenticationService.authenticateApiUser(apiKey, req.headers.passcode).then(r => {
    //       return done(null, true)
    //     }).catch(e => {
    //       return done(e.message, false)
    //     })
    //   }));

      passport.use('user-rule', new JwtStrategy(opts, function (req, payload, done) {
        UserDao.findUser(payload).then(user => {
          if (user == null) {
            return req.res.status(401).send({ error: true, message: "Data tempered detected. Details do not match - 4" })
          }
          let rUser = JSON.parse(JSON.stringify(user))
          
          return done(null, rUser)
        }).catch(e => {
          return req.res.status(401).send({ error: true, message: "USER_NOT_FOUND" })
        });
      }));



    //   passport.use(new JwtStrategy(opts, function (req, payload, done) {
    //     AuthenticationService.findUMUser(payload).then(user => {
    //       if (user.localUser == null) {
    //         return req.res.status(401).send({ error: true, message: "Data tempered detected. Details do not match - 3" })
    //       } else {
    //         if (!user.localUser.loggedIn || user.localUser._id != payload._id)
    //           return req.res.status(401).send({ error: true, message: "Session Expired. Please login again." })

    //         else if (req.baseUrl === '/admin' && !user.localUser.isAdmin)  // need to check if user is admin to access /admin path
    //           return req.res.status(401).send({ error: true, message: "Unable to login. Please contact us for support." })
    //       }

    //       let rUser = JSON.parse(JSON.stringify(user.localUser))
    //       rUser.password = undefined
    //       rUser.email = user.user.email
    //       rUser.countryCode = user.user.countryCode
    //       rUser.mobileNumber = user.user.mobileNumber
    //       rUser.name = user.user.name

    //       if (req.baseUrl === '/admin' && rUser.roles.indexOf(UserRoles.ADMIN.value) < 0) {
    //         return req.res.status(401).send({ error: true, message: "Data tempered detected. Details do not match" })
    //       }


    //       return done(null, rUser)

    //     }).catch(e => {
    //       return done(e, false)
    //     });
    //   }));


};