"use strict";

/* Shopping List App */

const itemRoutes = require("./itemRoutes");

const express = require("express");
const app = express();
const {NotFoundError} = require("./expressError");

app.use(express.json());

app.use("/items", itemRoutes);
/* 404 handler */
app.use(function(req, res, next){
  return next(new NotFoundError());
})

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;
