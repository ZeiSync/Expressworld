/** @format */

const express = require("express");
const controller = require("../controller/books.controller");
const middleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", controller.index);

router.get("/search", controller.search);

router.get("/create", middleware.requireAuth, controller.create);

router.post("/create", middleware.requireAuth, controller.postCreate);

router.get("/:id/delete", middleware.requireAuth, controller.delete);

router.get("/:id/update", middleware.requireAuth, controller.update);

router.post("/update", middleware.requireAuth, controller.postUpdate);

module.exports = router;
