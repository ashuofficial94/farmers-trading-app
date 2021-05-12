import express = require("express");

const dashboardController = require("../controllers/dashboard");

const router = express.Router();

router.get("/dashboard", dashboardController.getDashboard);
router.get("/logout", dashboardController.logout);

export { router };
