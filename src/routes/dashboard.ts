import express = require("express");

const dashboardController = require("../controllers/dashboard");

const router = express.Router();

router.get("/dashboard", dashboardController.getDashboard);
router.get("/logout", dashboardController.logout);
router.get("/get-proposals", dashboardController.getProposals);
router.get("/my-proposals", dashboardController.getFarmerProposalsPage);
router.post("/add-farmer-proposal", dashboardController.addFarmerProposal);
router.post("/close-proposal", dashboardController.closeProposal);
router.post("/place-bid", dashboardController.placeBid);

export { router };
