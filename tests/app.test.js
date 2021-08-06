const request = require("supertest");
const app = require("../index");

describe("APP - route '/*' responce", () => {
  it("respond with 'Welcome to JUSTIFIE API'", (done) => {
    request(app).get("/not-found").expect("Welcome to JUSTIFIE API", done);
  });
});
