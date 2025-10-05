const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/list", controller.getAllRuns);
router.post("/create", controller.createRun);
router.get("/run/:id", controller.getRun);

module.exports = router;
