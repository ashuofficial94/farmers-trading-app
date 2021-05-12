"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const dashboardController = require("../controllers/dashboard");
const router = express.Router();
exports.router = router;
router.get("/dashboard", dashboardController.getDashboard);
router.get("/logout", dashboardController.logout);
