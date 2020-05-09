const express = require('express');

const controller = require("../controller/contact.controller");

const router = express.Router();

router.get('/', controller.index);

router.post("/send", controller.sendMail);

module.exports = router;