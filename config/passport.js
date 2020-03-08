const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require('../models/user');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "g0f4cky3rs3lf";

const getUser = async obj => {
    return await User.findOne({
      where: obj
    });
};
  
let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  let user = getUser({ id: jwt_payload.id });

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

module.exports = {
    passport,
    jwt,
    jwtOptions,
    strategy
}