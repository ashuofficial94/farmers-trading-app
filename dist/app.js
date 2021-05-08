"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express = require("express");
const bodyParser = require("body-parser");
const _404_1 = require("./controllers/404");
const home_1 = require("./routes/home");
const app = express();
app.set("view engine", "ejs");
app.set("views", "dist/views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path_1.default.join(__dirname, "public")));
app.use(express.static(path_1.default.join(__dirname, "..", "node_modules")));
app.use(home_1.router);
app.use(_404_1.get404);
app.listen(3000);
