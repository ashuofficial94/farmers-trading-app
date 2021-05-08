import path from "path";

import express = require("express");
import bodyParser = require("body-parser");

import { get404 } from "./controllers/404";
import { router as homeRoute } from "./routes/home";

const app = express();

app.set("view engine", "ejs");
app.set("views", "dist/views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "..", "node_modules")));

app.use(homeRoute);
app.use(get404);

app.listen(3000);
