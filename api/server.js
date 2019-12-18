const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session') //<<<< instal express-session
const KnexSessionStore = require('connect-session-knex')(sessions); // to store sessions in the database

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const knex = require('../database/dbConfig.js')

const server = express();

const sessionsConfiguration = {

//session storage options
  name: 'chocolatechip', // default would be sid
  secret:'keep it secret, keep it safe!', // used for encryption (must be an enviroment variable)
  saveUnitialized: true, // has implications with GDPR laws
  resave: false,

// how to store the sessions
  store: new KnexSessionStore({
    // do not forget the new keyword
    knex, //imported from dbConfig.js
    clearInterval: 100 * 60 * 10,
    createtable: true,
    sidfieldname: 'sid',
    tablename: 'sessions',
  }),

// cookie options
  cookie: {
    maxAge: 1000 * 60 * 10, // 10 mins in milliseconds
    secure: false, // if false the cookie is sent over http, if true only send over https
    httpOnly: true, // if true, JS cannot access the cookie
  }

}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(sessions(sessionsConfiguration))

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;