"use strict";

const { BadRequestError } = require("./expressError");

/** Helper method
 * Checks that price is a valid Number float
 * throws error or returns next
 **/
function checkPrice(priceStr) {
  if (isNaN(Number(priceStr)) || !priceStr) {
    throw new BadRequestError(`${priceStr} is not a number`);
  }

  return true;
}
// have different function names, 

/** Middleware function
 * Checks if the item POST has valid name and price
 **/  
function checkItem(req, res, next) {
  if (!req.body.name) {
    throw new BadRequestError(`Must provide a name.`);
  }
  checkPrice(req.body.price);
  return next();
}

module.exports = {checkItem};