import User from '../models/user';
import { errorHandler } from '../helpers/dbErrorHandler';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

export const signUp = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if(err) {
      return res.status(400).json({ message: errorHandler(err) });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user
    })
  })
}

export const signIn = (req, res) => {
  // find a user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if(err || !user){
      return res.status(400).json({
        error: "User does not exist, please sign in again or signup"
      })
    }

    if(!user.authenticate(password)){
      return res.status(401).json({
        error: 'Email and password does not match'
      })
    }

    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 })
    // return response with user and token to frontend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role }});
  })
}

export const signOut = (req, res) => {
  res.clearCookie('t');
  res.json({ message: "Sign out success" });
}

export const requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
})