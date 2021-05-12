"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const _404_1 = require("./controllers/404");
const home_1 = require("./routes/home");
const dashboard_1 = require("./routes/dashboard");
const database_1 = require("./utils/database");
const MONGODB_URI = "mongodb+srv://ashutosh_bajpai:password1234@cluster0.0zij8.mongodb.net/farmer-trading-db";
const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions",
});
app.set("view engine", "ejs");
app.set("views", "dist/views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path_1.default.join(__dirname, "public")));
app.use(express.static(path_1.default.join(__dirname, "..", "node_modules")));
app.use(session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
    store: store,
}));
app.use(home_1.router);
app.use(dashboard_1.router);
app.use(_404_1.get404);
database_1.mongoConnect(() => {
    app.listen(3000);
});
