/** @format */

// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const booksRouter = require("./routes/books.route");
const usersRouter = require("./routes/users.route");
const transactionsRouter = require("./routes/transactions.route");
const profileRouter = require("./routes/profile.route");
const authRouter = require("./routes/auth.route");
const contactRouter = require("./routes/contact.route");
const middleware = require("./middleware/auth.middleware");

const app = express();
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(bodyParser.json()); //utilizes the body-parser package
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./db");

app.set("view engine", "pug");
app.set("views", "./views");

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.render("index");
});

app.use("/books", middleware.requireAuth, booksRouter);
app.use("/users", middleware.requireAuth, usersRouter);
app.use("/profile", middleware.requireAuth, profileRouter);
app.use("/transactions", middleware.requireAuth, transactionsRouter);
app.use("/contact", middleware.requireAuth, contactRouter);

app.use("/auth", authRouter);

app.use(express.static("public"));

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
