const request = require("supertest");

const app = require("../app");
let db = require("../fakeDb");

let pickles = { name: "Pickles", price: 2.5 };

  
beforeEach(function() {
  db.items = [];
  db.items.push(pickles);
});
/** GET /items - returns `[{name:"SOMTHING", price: SOME-NUMBER}, ...]` */

describe("GET /items", function() {

  it("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual({"items": [{ name: "Pickles", price: 2.5 }]});
  });
});


/** POST /items - create item from data; returns `{added :{name:"SOMTHING", price: SOME-NUMBER}}` */

describe("POST /items", function() {
  it("Creates a new cat", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "test",
        price: "3.7"
      });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      added: { name: "test", price: 3.7}
    });
  });
});



/** PATCH/items - update item from data; returns `{updated :{name:"SOMTHING", price: SOME-NUMBER}}` */
describe("PATCH /items/:name", function() {
  it("Updates a single item", async function() {
    const resp = await request(app)
      .patch(`/items/${pickles.name}`)
      .send({
        name: "test",
        price: "5.6"
      });
    expect(resp.body).toEqual({
      updated: { name: "test", price: 5.6}
    });
  });

  it("Responds with 400 if item name invalid", async function() {
    const resp = await request(app).patch(`/items/not-here`);
    expect(resp.statusCode).toEqual(400);
  });
});


/** DELETE /items/[name] - delete item,
 *  return `{message: "Deleted"}` */

describe("DELETE /items/:name", function() {
  it("Deletes a single a item", async function() {
    const resp = await request(app)
      .delete(`/items/${pickles.name}`);
    expect(resp.body).toEqual({ message: "Deleted" });
    expect(db.items.length).toEqual(0);
  });
});

