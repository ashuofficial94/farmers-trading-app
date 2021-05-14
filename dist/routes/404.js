"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const notFoundController = require("../controllers/404");
const router = express.Router();
exports.router = router;
router.use(notFoundController.get404);
