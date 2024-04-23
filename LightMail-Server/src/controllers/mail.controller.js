const { Users } = require("../models");
const { Mails } = require("../models");
const httpStatus = require("http-status");
const { createResponseData } = require("../utils/response");
const constant = require("../utils/constants");
const { catchAsync } = require("../utils/catchAsync");

const checkToUserEmail = catchAsync(async (req, res) => {
  const email = req.body.email;
  const validEmail = await Users.findOne({ email: email });
  if (validEmail) {
    return createResponseData(
      res,
      {},
      httpStatus.OK,
      false,
      constant.EMAIL_FOUND
    );
  } else {
    return createResponseData(
      res,
      {},
      httpStatus.UNAUTHORIZED,
      true,
      constant.EMAIL_NOT_REGISTERED
    );
  }
});

const sendMail = catchAsync(async (req, res) => {
  let { from, to, subject, message, attachments } = req.body;
  const validEmail = await Users.findOne({ email: to });
  if (validEmail) {
    from = req.userData.userId;
    to = validEmail._id;
    attachments = [];

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        attachments.push(file.filename);
      });
    }

    const data = { from, to, subject, message, attachments };
    const mail = new Mails(data);
    const sendMails = await mail.save();
    return createResponseData(
      res,
      {},
      httpStatus.OK,
      false,
      constant.MAIL_SENT
    );
  } else {
    return createResponseData(
      res,
      {},
      httpStatus.NOT_FOUND,
      true,
      constant.RECIPIENT_NOT_REGISTERED
    );
  }
});

const getMails = catchAsync(async (req, res) => {
  const unreadMailCount = await Mails.find({
    to: req.userData.userId,
    status: "UNREAD",
    deleteStatus: "NONE",
  }).count();

  const mailData = await Mails.find({
    to: req.userData.userId,
    deleteStatus: "NONE",
  })
    .populate({
      path: "from",
      select: ["firstName", "lastName", "email"],
    })
    .populate({
      path: "to",
      select: ["firstName", "lastName", "email"],
    })
    .sort({ createdAt: -1 });
  return createResponseData(
    res,
    { unreadMailCount, mailData },
    httpStatus.OK,
    false,
    {}
  );
});

const getMail = catchAsync(async (req, res) => {
  const id = req.params.id;
  const getParticularMail = await Mails.findById({ _id: id })
    .populate({
      path: "from",
      select: ["firstName", "lastName", "email"],
    })
    .populate({
      path: "to",
      select: ["firstName", "lastName", "email"],
    });
  if (getParticularMail) {
    return createResponseData(
      res,
      { getParticularMail },
      httpStatus.OK,
      false,
      {}
    );
  }
  if (!getParticularMail) {
    return createResponseData(
      res,
      {},
      httpStatus.NOT_FOUND,
      false,
      constant.MAIL_NOT_FOUND
    );
  }
});

const readMail = catchAsync(async (req, res) => {
  const id = req.params.id;
  const unreadMailCount = await Mails.find({
    to: req.userData.userId,
    status: "UNREAD",
  }).count();

  const readmail = await Mails.findByIdAndUpdate(
    { _id: id },
    { status: "READ", readAt: new Date() },
    {
      new: true,
    }
  )
    .populate({
      path: "from",
      select: ["firstName", "lastName", "email"],
    })
    .populate({
      path: "to",
      select: ["firstName", "lastName", "email"],
    });

  return createResponseData(
    res,
    { unreadMailCount, readmail },
    httpStatus.OK,
    false,
    {}
  );
});

const getSentMail = catchAsync(async (req, res) => {
  const mailData = await Mails.find({ from: req.userData.userId })
    .populate({
      path: "from",
      select: ["firstName", "lastName", "email"],
    })
    .populate({
      path: "to",
      select: ["firstName", "lastName", "email"],
    })
    .sort({ createdAt: -1 });
  return createResponseData(res, mailData, httpStatus.OK, false, {});
});

const deleteMail = catchAsync(async (req, res) => {
  const id = req.params.id;
  const deleteMail = await Mails.findByIdAndUpdate(
    { _id: id },
    { deleteStatus: "TRASHED", readAt: "" }
  );
  if (deleteMail) {
    return createResponseData(
      res,
      {},
      httpStatus.OK,
      false,
      constant.MAIL_DELETED
    );
  }
});

const getTrashedMail = catchAsync(async (req, res) => {
  const toTrashedMails = await Mails.find({
    to: req.userData.userId,
    deleteStatus: "TRASHED",
  })
    .populate({
      path: "from",
      select: ["firstName", "lastName", "email"],
    })
    .populate({
      path: "to",
      select: ["firstName", "lastName", "email"],
    })
    .sort({ createdAt: -1 });
  return createResponseData(res, toTrashedMails, httpStatus.OK, false, {});
});

const counter = catchAsync(async (req, res) => {
  const id = req.params.id;
  const counter = await Mails.findByIdAndUpdate(
    { _id: id },
    { $inc: { counter: 1 } },
    {
      new: true,
    }
  );
  return createResponseData(res, counter, httpStatus.OK, false, {});
});

module.exports = {
  sendMail,
  getMails,
  getMail,
  getSentMail,
  readMail,
  checkToUserEmail,
  deleteMail,
  getTrashedMail,
  counter,
};
