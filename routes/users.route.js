const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users } = require('../models/users.model');
const { body, validationResult } = require('express-validator');

const userRouter = express.Router();

userRouter.post(
  '/register',
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const hash = await bcrypt.hash(password, 5);
      const user = new Users({ name, email, password: hash });
      await user.save();
      res.send({ msg: 'New user has been registered.' });
    } catch (err) {
      res.status(500).send({ msg: 'Unable to register user.', error: err.message });
    }
  }
);

userRouter.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ email });
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = jwt.sign({ userID: user._id }, "masai");
          res.send({ msg: 'Login successful.', token });
        } else {
          res.status(401).send({ msg: 'Invalid credentials.' });
        }
      } else {
        res.status(401).send({ msg: 'Invalid credentials.' });
      }
    } catch (err) {
      res.status(500).send({ msg: 'Unable to login.', error: err.message });
    }
  }
);

module.exports = {
  userRouter,
};
