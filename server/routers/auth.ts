import express from 'express';
import passport from 'passport';

const { Router } = express;
const router = Router();

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
    failureRedirect: '/login' }));

export default router;
