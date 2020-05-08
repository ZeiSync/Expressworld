const shortid = require("shortid");
const db = require("../db");

module.exports.index = (req, res) => {
  res.render("books/index", { books: db.get("books").value() });
};

module.exports.search = (req, res) => {
  let q = req.query.q;
  let books = db.get("books").value();
  let bookFiltered = books.filter(book => {
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render("books/index", { books: bookFiltered, q: q });
};

module.exports.create = (req, res) => {
  res.render("books/create");
};

module.exports.postCreate = (req, res) => {
  if (req.body.title && req.body.description) {
    req.body.id = shortid.generate();
    db.get("books")
      .push(req.body)
      .write();
    res.redirect("/books");
    return;
  }

  res.render("books/create", {
    title: req.body.title,
    description: req.body.description
  });
};

module.exports.delete = (req, res) => {
  let id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  res.render("books/index", { books: db.get("books").value() });
};

module.exports.update = (req, res) => {
  console.log(req.params.id);
  res.render("books/update", { id: req.params.id });
};

module.exports.postUpdate = (req, res) => {
  console.log(req.body.id);
  if (!req.body.title) {
    res.render("books/update", { id: req.body.id, title: req.body.title });
    return;
  }
  db.get("books")
    .find({ id: req.body.id })
    .assign({ title: req.body.title })
    .write();
  res.render("books/index", { books: db.get("books").value() });
};
