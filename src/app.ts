import path from "path";

import express = require("express");
import bodyParser = require("body-parser");

import { get404 } from "./controllers/404";

const app = express();
console.log(path.join(__dirname, "..", "node_modules", "jquery", "dist"));

app.set("view engine", "ejs");
app.set("views", "dist/views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
    express.static(path.join(__dirname, "..", "node_modules", "jquery", "dist"))
);
app.use(
    express.static(
        path.join(__dirname, "..", "node_modules", "bootstrap", "dist", "js")
    )
);
app.use(
    express.static(
        path.join(__dirname, "..", "node_modules", "bootstrap", "dist", "css")
    )
);

app.use(get404);

app.listen(3000);