/** @format */

const db = require("../db");
const shortid = require("shortid");
const bcrypt = require("bcrypt");

module.exports.index = (req, res) => {
  res.render("users/index", {
    data: res.paginatedResults,
  });
};

module.exports.search = (req, res) => {
  let query = req.query.q;
  let users = db.get("users").value();

  let userFilter = users.filter((user) => {
    return user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });
  res.render("users/index", { users: userFilter, q: query });
};

module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    req.body.password = hash;
  });

  db.get("users").push(req.body).write();
  res.redirect("/users");
  return;
};

module.exports.delete = (req, res) => {
  let id = req.params.id;
  db.get("users").remove({ id: id }).write();
  res.render("users/index", { users: db.get("users").value() });
};

module.exports.update = (req, res) => {
  const user = db.get("users").find({ id: req.params.id }).value();
  res.render("users/update", { user: user });
};

module.exports.postUpdate = (req, res) => {
  console.log(req.body);
  if (!req.body.name) {
    res.render("users/update", { id: req.body.id, name: req.body.name });
    return;
  }
  db.get("users")
    .find({ id: req.body.id })
    .assign({ name: req.body.name })
    .write();
  res.render("users/index", { users: db.get("users").value() });
};
