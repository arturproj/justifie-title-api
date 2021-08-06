const jwt = require("jwt-simple");
const controllerAUTH = require("../controller/token");

function JustifyText(text = "", lenMax = 80) {
  text = text.length % 2 === 0 ? text : ` ${text}`;
  let lenMin = (lenMax - text.length) / 2;

  while (lenMin > 0) {
    text = ` ${text} `;
    lenMin--;
  }

  console.log(`¤${text}¤`, text.length, text.length === lenMax);
  return text;
}

function ValidateJWT(authorization) {
  let token, expiredTime;
  try {
    token = jwt.decode(authorization.replace("Bearer ", ""), "secret");
    expiredTime = Date.parse(token.date);
  } catch (e) {
    // if any error, Code throws the error
    // console.log("err :", e);
    expiredTime = null;
    token = null;
  }
//   console.log({ token, expiredTime });

  return { token, expiredTime };
}

module.exports = {
  JustifyText,
  ValidateJWT,
};
