import express from 'express';
import passport from 'passport';
import { Jwt } from "jsonwebtoken";
import config from '../utils/config';
import logger from '../utils/logger';

const router = express.Router();

router.post('/signup', 
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user,

    });
  }
);

router.post('/login',
  async (req, res, next) => {
    passport.authenticate('login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const err = new Error('An error occurred');
            return next(err);
          }

          req.login(
            user,
            { session: false },
            async (e) => {
              if (e) return next(e);

              const body = { _id: user._id, email: user.email };
              const token = Jwt.sign({ user: body }, config.SECRET);
              return res.json({ token });
            }
          );
        } catch (e) {
          logger.error(e);
          return next(e);
        }
      }
    )(req, res, next);
  }
)

export default router;