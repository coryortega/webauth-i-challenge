const router = require('express').Router();
const Users = require('./users-model.js');
const restricted = require('../api/configure-middleware.js');


router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/sessions', restricted, (req, res) => {
  Users.findSessions()
    .then(sessions => {
      res.json(sessions);
    })
    .catch(err => res.send(err));
});

router.get('/user', (req, res) => {

  const user = req.body

  Users.findBy(user)
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;