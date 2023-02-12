import passport from "passport";
import passportLocal from "passport-local";
import JwtStrategy from "passport-jwt/lib/strategy";
import { ExtractJwt } from "passport-jwt/lib";
import UserModel from "../models/user";
import logger from "../utils/logger";
import config from "../utils/config";
const LocalStrategy = passportLocal.Strategy;

// save new user info to db and sends info to next middleware if successful
passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',

  },
  async (email, password, done) => {
    try {
      const user = await UserModel.create({ email, password });
      return done(null, user);
    } catch (e) {
      done(e)
    }
  }
));

// authenticate user and send user to next middleware if successful
passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',

},
async (email, password, done) => {
  try {
    const user = UserModel.findOne({ email });

    if (!user) return done(null, false, { message: 'User not found' });

    const isValid = await user.isValidPassword(password);
    if (!isValid) return done(null, false, { message: 'Wrong Password' });

    return done(null, user, { message: 'Logged in successfully' });
  } catch (e) {
    logger.error(`Error validating user ${email}`);
    return done(e)
  }
}
));

passport.use(new JwtStrategy(
  {
    secretOrKey: config.SECRET,
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token'),

  },
  async (token, done) => {
    try {
      return done(null, token.user);
    } catch (e) {
      logger.error(e);
      done(e);
    }
  }
));