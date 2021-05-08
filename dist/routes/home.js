"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const homeController = require("../controllers/home");
const router = express.Router();
exports.router = router;
router.post("/add-user", homeController.addUser);
router.get("/", homeController.getHomePage);
