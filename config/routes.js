const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const key = require('../_secrets/keys');
const jwt = require('jsonwebtoken');

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
    subject: user.userId,
    username: user.username
  };
  const secret = key.jwtKey;
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}

function register(req, res) {
  // implements user registration
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 4);
  creds.password = hash;

  db('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ newUserId: id })
    })
    .catch(err => {
      res.status(500).json({ err })
    })
}

function login(req, res) {
  // implements user login
  const creds = req.body;

  db('users')
  .where({ username: creds.username })
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(creds.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ Welcome: "enjoy the dad jokes!", token })
    } else {
      res.status(401).json({ message: "Oops, that didn't work!" })
    }
  })
  .catch(err => res.status(500).json({err}))
};

function getJokes(req, res) {
  axios
    .get('https://safe-falls-22549.herokuapp.com/random_ten')
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
