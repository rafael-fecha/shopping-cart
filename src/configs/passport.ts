import { Utils } from '../utils/utils';

/* Modules */
const mongoose = require('mongoose');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

/* Database models */
const Users = mongoose.model('Users');

export class Passport {
  private utils: Utils;

  constructor() {
    this.utils = new Utils();
    this.utils.generateJWTSecretToken();
  }

  setupConfigs() {
    passport.use(
      new LocalStrategy(
        {
          usernameField: 'user[email]',
          passwordField: 'user[password]'
        },
        (email, password, done) => {
          Users.findOne({ email })
            .then(user => {
              if (!user || !user.validatePassword(password)) {
                return done(null, false, {
                  errors: { 'email or password': 'is invalid' }
                });
              }

              return done(null, user);
            })
            .catch(done);
        }
      )
    );

    passport.use(
      new JWTStrategy(
        {
          jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
          secretOrKey: this.utils.getJWTSecretToken()
        },
        function(jwtPayload, cb) {
          return Users.findOne({ email: jwtPayload.email })
            .then(user => {
              return cb(null, user);
            })
            .catch(err => {
              return cb(err);
            });
        }
      )
    );
  }
}
