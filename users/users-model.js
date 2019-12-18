const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findSessions,
};

function find() {
  return db("users").select("id", "username");
}

function findSessions() {
  return db("sessions");
}

function findBy(filter) {
  return db("users")
    .select("id", "username", "password") // make sure to return the password
    .where(filter);
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}