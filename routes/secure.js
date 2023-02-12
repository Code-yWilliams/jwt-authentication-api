import express from 'express';
const router = express.Router();

router.get('/profile', (req, res, next) => {
  res.json({
    message: 'Secure route reached',
    user: req.user,
    token: req.query.secret_token,

  });
});

export default router;