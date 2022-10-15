import express from 'express';
import '../middlewares/auth/google-strategy.js';
import passport from 'passport';
import checkLogin from '../middlewares/auth/login.js';
const auth = express.Router();

// get User Information
auth.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

auth.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/auth/failure' }),
  function (req, res) {
    console.log('REQUEST');
    console.log(req.user);
    res.redirect('/api/auth/success');
  }
);

auth.get('/success', checkLogin, (req, res) => {
  console.log(req.headers);
  res.send('Successfully logged in!');
});

auth.get('/failure', (req, res) => {
  res.send('Login failed!');
});

auth.post('/logout', (req, res) => {
  req.logout();
  res.send('User logged out');
  console.log('User logged out!');
});

export default auth;
