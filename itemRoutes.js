"use strict";

/* Routes for items in Shopping List app*/

const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();
const middleware = require("./middleware");
const { NotFoundError, BadRequestError } = require("./expressError");

/** GET /items: get list of all items */  
router.get("/", function (req, res, next) {
  // TODO: returns data for all items
  return res.json({
    items: db.items
  });
});

/** POST item: adds an item to db, returns 
 * { added: { name: "SOME_NAME", price: SOME_FLOAT_PRICE } }
 **/  
router.post("/", middleware.checkItem, function (req, res, next) {
  // TODO: accepts req.body and adds the item to db, and returns it
  let { name, price } = req.body;
  db.items.push({name, price: Number(price)});
  return res.json({
    added: {
      name,
      price
    }
  });

});

/** GET :name, returns { name: NAME, price: FLOAT_PRICE } */  
router.get("/:name", function (req, res, next) {

  const foundItem = db.items.find( item => {
    return item.name === req.params.name;
  });

  if (!foundItem) {
    throw new NotFoundError(`${req.params.name} does not exist.`);
  }

  
  return res.json(foundItem);
});

/** PATCH :name, accepts req body, modifies item with :name,
 * returns { updated: { name: "SOME_NAME", price: SOME_FLOAT_PRICE } } 
 **/  
router.patch("/:name", middleware.checkItem,  function (req, res, next) {
  let foundItemIdx = db.items.findIndex((item) => {
    return item.name === req.params.name;
  });

  if (foundItemIdx === -1) {
    throw new NotFoundError(`${req.params.name} does not exist.`);
  }
  const { name, price } = req.body; 
  db.items[foundItemIdx] = {
    name, 
    price: Number(price)
  };

  return res.json({
    updated: db.items[foundItemIdx]
  })
});

/** DELETE /:name: deletes user with :name, 
 * returns {message: "Deleted"}
 **/  
router.delete("/:name", function (req, res, next) {
  if (!req.params.name) {
    throw new BadRequestError(`Must provide a name.`);
  }

  let foundItemIdx = db.items.findIndex((item) => {
    return item.name === req.params.name;
  });

  if (foundItemIdx === -1) {
    throw new NotFoundError(`${req.params.name} does not exist.`);
  }

  db.items.splice(foundItemIdx, 1);

  return res.json({ message: "Deleted" });
});

module.exports = router;