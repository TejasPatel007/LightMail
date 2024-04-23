const express = require("express");
const router = express.Router();
const { mailValidation } = require("../validations");
const { mailController, adminController } = require("../controllers");
const { checkToken } = require("../middleware/Tokenauth");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/attachments");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/checkUserMail", checkToken, mailController.checkToUserEmail);

router.post(
  "/sendMail",
  checkToken,
  upload.array("attachments", 10),
  function (req, res, next) {
    if (req.files.length > 10) {
      res.status(400).send("You can attach up to 10 files only");
    } else {
      next();
    }
  },
  mailValidation.sendingMailValidation,
  function (err, req, res, next) {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      res.status(400).send("File size should be less than 5 MB");
    } else {
      next();
    }
  },
  mailController.sendMail
);

router.get("/getMails", checkToken, mailController.getMails);

router.get("/getMail/:id", checkToken, mailController.getMail);

router.get("/sentMails", checkToken, mailController.getSentMail);

router.patch("/readMails/:id", checkToken, mailController.readMail);

router.delete("/deleteMail/:id", checkToken, mailController.deleteMail);

router.get("/getTrashedMails", checkToken, mailController.getTrashedMail);

router.patch("/incrementCounter/:id", checkToken, mailController.counter);

module.exports = router;
