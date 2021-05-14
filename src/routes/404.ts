import express = require("express");

const notFoundController = require("../controllers/404");

const router = express.Router();

router.use(notFoundController.get404);

export { router };
