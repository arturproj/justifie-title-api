const request = require("supertest");
const app = require("../index");

describe("TOKEN tests", () => {
  it("POST /token - request without email body ", (done) => {
    request(app)
      .post("/token")
      .set("Content-Type", "application/json") //set header for this test
      .send()
      .expect("Content-Type", /json/)
      .expect(function (res) {
        console.log("   req.body :", {});
        console.log("   res.body :", res.body);
      })
      .expect(405, { success: false, error: "no email found" }, done);
  });

  it("POST /token - respons with json ", (done) => {
    var req_param = {
      email: "foo@bar.com",
    };
    request(app)
      .post("/token")
      .set("Content-Type", "application/json") //set header for this test
      .send(req_param)

      .expect("Content-Type", /json/)
      .expect(function (res) {
        console.log("   req.body :", req_param);
        console.log("   res.body :", res.body);
        res.body.token = res.body.token ? "OK" : "FAIL";
      })
      .expect(
        200,
        {
          success: true,
          token: "OK",
        },
        done
      );
  });
});
