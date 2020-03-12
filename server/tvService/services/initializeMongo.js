const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'hacktiv8';

module.exports = function () {
  return async function (req, res, next) {
    try {
      const mongo = await MongoClient.connect(url);
      const db = await mongo.db(dbName);
      req.db = db;
      next();
    } catch (error) {
      next(error);
    }
  }
}