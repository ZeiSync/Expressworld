const express = require("express");
const controller = require("../controller/transactions.controller");

const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

router.get("/:id/complete", controller.complete);

module.exports = router;
