/** @format */

const express = require("express");
const controller = require("../controller/transactions.controller");
const middleware = require("../middleware/pagination.middleware");
const db = require("../db");

const router = express.Router();

router.get(
  "/",
  middleware.paginetedResut(db.get("transactions").value()),
  controller.index
);

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

router.get("/:id/complete", controller.complete);

module.exports = router;
