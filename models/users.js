const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  email: { type: String, required: true, lowercase: true },
  requests: { type: Number, required: true, default: 0 },
  requestsLimit: { type: Number, required: true, default: 80000 },
  lastRequestDate: { type: Date, required: true, default: Date.now },
  created: { type: Date, required: true, default: Date.now },
  token: { type: String, required: true },
});


const authModel = mongoose.model("auth", authSchema);

module.exports = authModel;
