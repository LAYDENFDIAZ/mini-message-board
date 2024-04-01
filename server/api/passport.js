const passport = require("passport");
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const { findUserById } = require("../database");

const SECRET = process.env.SECRET || "funkyFries";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

const strategy = new JWTStrategy(options, async (payload, done) => {
  try {
    const user = await findUserById(payload.sub);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error, null);
  }
});

passport.use(strategy);

module.exports = passport;
