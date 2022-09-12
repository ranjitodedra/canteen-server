var express = require("express");
var controller = require("./controller");

var router = express.Router();

router.get("/login", controller.login);

module.exports = router;
