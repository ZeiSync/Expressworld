/** @format */

const express = require("express");

const router = express.Router();

const controller = require("../controller/users.controller");
const validate = require("../validation/users.validate");
const middleware = require("../middleware/pagination.middleware");
const db = require("../db");

router.get(
  "/",
  middleware.paginetedResut(db.get("users").value()),
  controller.index
);

router.get("/search", controller.search);

router.get("/create", controller.create);

router.post("/create", validate.postCreate, controller.postCreate);

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.post("/update", controller.postUpdate);

module.exports = router;
