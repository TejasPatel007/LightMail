const express = require("express");
const router = express.Router();
const { authValidation } = require("../validations");
const { authController } = require("../controllers");
const { checkTokenForUser } = require("../middleware/Tokenauth");

router.post(
  "/register",
  authValidation.registerValidation,
  authController.register
);
router.post("/login", authValidation.LoginValidation, authController.login);

router.get("/getUser/:id", checkTokenForUser, authController.getUser);

module.exports = router;
