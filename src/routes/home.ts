import express = require("express");

const homeController = require("../controllers/home");

const router = express.Router();

router.post("/add-user", homeController.addUser);
router.post("/login-user", homeController.loginUser);
router.get("/", homeController.getHomePage);

export { router };
