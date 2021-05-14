import path from "path";

import express = require("express");
import bodyParser = require("body-parser");
import session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

import { router as route404 } from "./routes/404";
import { router as homeRoute } from "./routes/home";
import { router as dashboardRoute } from "./routes/dashboard";
import { mongoConnect } from "./utils/database";

const MONGODB_URI =
    "mongodb+srv://ashutosh_bajpai:password1234@cluster0.0zij8.mongodb.net/farmer-trading-db";
const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "dist/views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "..", "node_modules")));
app.use(
    session({
        secret: "secret key",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(homeRoute);
app.use(dashboardRoute);
app.use(route404);

mongoConnect(() => {
    app.listen(3000);
});
