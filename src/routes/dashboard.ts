import express = require("express");

const dashboardController = require("../controllers/dashboard");

const router = express.Router();

router.get("/dashboard", dashboardController.getDashboard);
router.get("/logout", dashboardController.logout);
router.get("/get-proposals", dashboardController.getProposals);
router.get("/my-proposals", dashboardController.getFarmerProposalsPage);
router.get("/my-bids", dashboardController.getTraderBidsPage)
router.post("/get-proposal-bid", dashboardController.getProposalBid);
router.post("/add-farmer-proposal", dashboardController.addFarmerProposal);
router.post("/close-proposal", dashboardController.closeProposal);
router.post("/place-bid", dashboardController.placeBid);
router.post("/accept-bid", dashboardController.acceptBid);

export { router };
