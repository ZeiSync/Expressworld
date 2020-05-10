/** @format */

const express = require("express");

const router = express.Router();

const controller = require("../controller/profile.controller");
const middleware = require("../middleware/upload.middleware");

router.get("/", controller.index);

router.get("/avatar", controller.updateAvatar);

router.post("/avatar", middleware.uploadResults(), controller.Postupdate);

module.exports = router;
