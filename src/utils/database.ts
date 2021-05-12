import { MongoClient as Client } from "mongodb";

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db: any;

const mongoConnect = (callback: Function) => {
    MongoClient.connect(
        "mongodb+srv://ashutosh_bajpai:password1234@cluster0.0zij8.mongodb.net/farmer-trading-db?retryWrites=true&w=majority",
        { useUnifiedTopology: true }
    )
        .then((client: Client) => {
            _db = client.db();
            console.log("Connected to Database.");
            callback();
        })
        .catch((err: Error) => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) return _db;
    throw "No database found!";
};

export { mongoConnect, getDb };
