import express from "express";
import passport from "passport";

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

export default router;