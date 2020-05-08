/** @format */

const express = require("express");

const router = express.Router();

const controller = require("../controller/profile.controller");

router.get("/", controller.index);

router.get("/avatar", controller.updateAvatar);

router.post("/avatar", controller.Postupdate);

module.exports = router;
