const express = require("express");
const intrestController = require("../controllers/intrestController");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.get("/get", protect, intrestController.getIntrest);
router.patch("/add", protect, intrestController.createIntreest);
router.patch("/delete", protect, intrestController.deleteIntrest);
module.exports = router;
