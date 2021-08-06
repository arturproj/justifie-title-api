const express = require("express");
const router = express.Router();
const controllerAUTH = require("../controller/token");
const { ValidateJWT, JustifyText } = require("../controller/justify");

// middleware that is specific to this router
router.use(function (req, res, next) {
  // verifiable existence of the authentification header
  if (!req.headers.authorization)
    return res
      .status(403)
      .json({ success: false, error: "no credentials found" });
  // verifiable existence of the text parameter
  if (!req.body.text)
    return res
      .status(403)
      .json({ success: false, error: "no param text found" });

  next();
});

// define the justify text route
router.post("*", async function (req, res) {
  let { token, expiredTime } = ValidateJWT(req.headers.authorization);
  // console.log({ token, expiredTime });
  // in case the token is not valid, negative response
  if (!token)
    return res.status(401).json({
      success: false,
      error: "invalid credentials. authentication required.",
    });
  // in case the token has expired, negative response
  if (expiredTime < Date.now())
    return res.status(401).json({
      success: false,
      error: "your credentials expired. authentication required.",
    });

  user = await controllerAUTH.read(token.email);

  // if the number of requests equals limit
  if (user.requests >= user.requestsLimit)
    return res.status(402).json({
      success: false,
      error: "Payment Required",
    });

  await controllerAUTH.updateReq(token.email);
  /**
   *
   */
  res.setHeader("content-type", "text/plain");
  return res.send(JustifyText(req.body.text));
});

module.exports = router;
