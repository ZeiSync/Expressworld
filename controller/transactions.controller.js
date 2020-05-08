const db = require("../db");
const shortid = require("shortid");

let transformData = userId => {
  let transactions = db.get("transactions").value();
  console.log();
  let transMapped = transactions.map(trans => {
    if (
      db
        .get("users")
        .find({ id: userId })
        .value().isAdmin
    ) {
      return {
        id: trans.id,
        book: db
          .get("books")
          .find({ id: trans.bookId })
          .value().title,
        user: db
          .get("users")
          .find({ id: trans.userId })
          .value().name,
        isComplete: trans.isComplete
      };
    }

    return {
      id: trans.id,
      book: db
        .get("books")
        .find({ id: trans.bookId })
        .value().title,
      user: db
        .get("users")
        .find({ id: userId })
        .value().name,
      isComplete: trans.isComplete
    };
  });

  return transMapped;
};

module.exports.index = (req, res) => {
  res.render("transactions/index", {
    transactions: transformData(req.cookies.userId)
  });
};

module.exports.create = (req, res) => {
  let users = db.get("users").value();
  let books = db.get("books").value();

  res.render("transactions/create", { users: users, books: books });
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  req.body.isComplete = false;
  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("/transactions");
  return;
};

module.exports.complete = (req, res) => {
  let errors = [];
  if (
    typeof db
      .get("transactions")
      .find({ id: req.params.id })
      .value() === "undefined"
  ) {
    console.log("ayy");
    errors.push("Transaction not found");
  }

  if (errors.length) {
    res.render("transactions/index", {
      errors: errors,
      transactions: transformData()
    });
    return;
  }

  db.get("transactions")
    .find({ id: req.params.id })
    .assign({ isComplete: true })
    .write();
  res.redirect("back");
};
