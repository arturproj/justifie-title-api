const request = require("supertest");
const app = require("../index");

describe("JUSTIFIE tests", () => {
  it("POST /justify - request without authorization header ", (done) => {
    var req_param = {
      text: "hello!",
    };
    request(app)
      .post("/justify")
      .set("Content-Type", "application/json") //set header for this test
      .send(req_param)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        console.log("   req.body :", req_param);
        console.log("   res.body :", res.body);
      })
      .expect(403, { success: false, error: "no credentials found" }, done);
  });

  it("POST /justify - request with fake authorization header ", (done) => {
    var req_param = {
      text: "hello!",
    };
    request(app)
      .post("/justify")
      .set("Content-Type", "application/json") //set header for this test
      .set(
        "authorization",
        "Bearer abcdef123456.dsdhsidgjkqsdgsjdg.098765432SDFGHJ"
      )
      .send(req_param)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        console.log("   req.body :", req_param);
        console.log("   res.body :", res.body);
      })
      .expect(
        401,
        {
          success: false,
          error: "invalid credentials. authentication required.",
        },
        done
      );
  });
});

// describe(`requires auth`, () => {
//   it("POST /justify - request with authorization header ", (done) => {
//     var req_justifie = {
//       text: "hello!",
//     };
//     request(app)
//       .post("/token")
//       .set("Content-Type", "application/json")
//       .send({
//         email: "foo@bar.com",
//       })
//       .then(function (res_token) {
//         assert.ok(res_token);
//         return request(app)
//           .post("/justify")
//           .set("Content-Type", "application/json") //set header for this test
//           .set("authorization", `Bearer ${res_token.body.token}`)
//           .send(req_justifie)
//           .expect("Content-Type", "text/plain; charset=utf-8")
//           .expect(function (data) {
//             console.log("   ini.body :", res_token.body);
//             console.log("   req.body :", req_justifie);
//             console.log("   res.body :", `|${data.text}|`);
//           })
//           .expect(
//             200,
//             "                                     hello!                                     ",
//             done
//           );
//       });
//     // .expect(res);
//   });
// });
