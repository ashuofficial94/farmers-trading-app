"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.mongoConnect = void 0;
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback) => {
    MongoClient.connect("mongodb+srv://ashutosh_bajpai:password1234@cluster0.0zij8.mongodb.net/farmer-trading-db?retryWrites=true&w=majority", { useUnifiedTopology: true })
        .then((client) => {
        _db = client.db();
        console.log("Connected to Database.");
        callback();
    })
        .catch((err) => {
        console.log(err);
        throw err;
    });
};
exports.mongoConnect = mongoConnect;
const getDb = () => {
    if (_db)
        return _db;
    throw "No database found!";
};
exports.getDb = getDb;
