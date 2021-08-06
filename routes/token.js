const express = require("express");
const router = express.Router();
const userAUTH = require("../controller/token");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  if (!req.body.email) {
    /**
     * we ask for email as a mandatory parameter,
     * if it is not present, return an error by default
     */
    return res.status(405).json({ success: false, error: "no email found" });
  }
  next();
});

// define the token auth route for
router.post("*", function (req, res) {
  userAUTH.read(req.body.email).then(async function (user) {
    /**
     * user object contains the data object of the db,
     * check the existence of the account
     * it can be a decoded json object or null
     */
    // console.log("router.post read", user);
    if (!user) {
      await userAUTH.create(req.body.email);

      user = await userAUTH.read(req.body.email);

      // console.log("router.post created", user);
    }

    if (user.requests > user.requestsLimit) {
      /**
       *
       */
      return res.send({
        success: false,
        error: "upgrade plan required.",
      });
    }
    /**
     *
     */
    let token = await userAUTH.updateToken(user.email);

    /**
     *
     */
    return res.send({
      success: true,
      token: token,
    });
  });
});

module.exports = router;
