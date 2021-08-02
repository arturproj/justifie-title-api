const request = require("supertest");
const app = require("../index");

describe("app - contant responce", () => {
  it("respond with 'Welcome to JUSTIFIE API'", (done) => {
    request(app).get("/not-found").expect("Welcome to JUSTIFIE API", done);
  });

  it("respond ", (done) => {
    request(app)
      .post("/token")
      .set("Content-Type", "application/json") //set header for this test
      .send({
        email: "foo@bar.com",
      })

      .expect("Content-Type", /json/, done);
  });

  it("respond ", (done) => {
    request(app).get("/justify").expect("Welcome to JUSTIFIE API", done);
  });
});
