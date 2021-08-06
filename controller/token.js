const { addHoursToDate } = require("./helpers/date");

const authModel = require("../models/users");
const jwt = require("jwt-simple");

async function create(email) {
  // console.log("create", email);

  var token = jwt.encode(
    { email, origin: "justifie-api", date: addHoursToDate(new Date(), 5) },
    "secret"
  );
  return new authModel({ email: email, token: token }).save();
}

async function read(email) {
  // console.log("read", email);
  return await authModel.findOne({ email });
}

async function updateReq(email) {
  // console.log("updateReq", email);

  return await authModel.updateOne(
    { email },
    { $inc: { requests: 1 }, $set: { lastRequestDate: new Date() } },
    { upsert: true, multi: false }
  );
}

async function updateToken(email) {
  // console.log("updateToken", email);

  var token = jwt.encode(
    { email, origin: "justifie-api", date: addHoursToDate(new Date()) },
    "secret"
  );

  await authModel.updateOne(
    { email },
    { $set: { token: token } },
    { upsert: true, multi: false }
  );

  return token;
}

async function remove(id) {
  // console.log("getById", id);

  return true;
}

module.exports = {
  create,
  updateReq,
  updateToken,
  read,
  remove,
};
