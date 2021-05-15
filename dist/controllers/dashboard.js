"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const farmer_proposal_1 = require("../model/farmer-proposal");
const trader_bid_1 = require("../model/trader-bid");
exports.getDashboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.user) {
        console.log("No user logged in");
        res.redirect("/");
        return;
    }
    const proposals = yield farmer_proposal_1.FarmerProposal.fetchAll();
    res.render("dashboard", {
        pageTitle: "Dashboard",
        tabTitle: "feed",
        user: req.session.user,
        proposals: proposals,
    });
});
exports.logout = (req, res, next) => {
    if (!req.session.user) {
        console.log("No user logged in");
        res.redirect("/");
        return;
    }
    console.log("Log out: " + req.session.user.userName);
    req.session.destroy((err) => {
        if (err)
            console.log(err);
    });
    res.redirect("/");
};
exports.getProposals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const proposals = yield farmer_proposal_1.FarmerProposal.getUserProposals(req.session.user.userName)
        .then((proposals) => {
        return proposals;
    })
        .catch((err) => {
        console.log(err);
    });
    res.send(proposals);
});
exports.getFarmerProposalsPage = (req, res, next) => {
    res.render("dashboard", {
        pageTitle: "Dashboard",
        tabTitle: "farmer-proposals",
        user: req.session.user,
    });
};
exports.addFarmerProposal = (req, res, next) => {
    const userId = req.body.username;
    const crop = req.body.crop;
    const basePrice = req.body.basePrice;
    const state = req.body.state;
    const city = req.body.city;
    const proposal = new farmer_proposal_1.FarmerProposal(userId, crop, basePrice, state, city);
    proposal.save();
    res.redirect("/my-proposals");
};
exports.closeProposal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield farmer_proposal_1.FarmerProposal.closeProposal(req.body._id);
    return response;
});
exports.placeBid = (req, res, next) => {
    const proposalId = req.body.proposalId;
    const bidderId = req.session.user.userName;
    const bidAmount = parseInt(req.body.bidAmount.substring(1));
    const bid = new trader_bid_1.TraderBid(proposalId, bidderId, bidAmount);
    bid.save();
    res.redirect("/dashboard");
};
exports.getBidderBid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bids = yield trader_bid_1.TraderBid.getBidByBidder(req.session.user.userName);
    res.send(bids);
});
exports.getProposalBid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const proposalId = req.body;
    const bids = yield trader_bid_1.TraderBid.getBidByProposal(proposalId);
    res.send(bids);
});
exports.acceptBid = (req, res, next) => {
    const data = JSON.parse(req.body);
    trader_bid_1.TraderBid.acceptBid(data.bid, data.proposal);
    res.send({});
};
exports.getTraderBidsPage = (req, res, next) => {
    res.render("dashboard", {
        pageTitle: "Dashboard",
        tabTitle: "trader-bids",
        user: req.session.user,
    });
};
exports.getProposalById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = JSON.parse(req.body);
    const proposal = yield farmer_proposal_1.FarmerProposal.getProposalById(data.proposalId);
    res.send(proposal);
});
exports.getAcceptedBid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = JSON.parse(req.body);
    const proposal = yield farmer_proposal_1.FarmerProposal.getProposalById(data.proposalId);
    res.send(proposal.acceptedBid);
});
exports.confirmBid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = JSON.parse(req.body);
    trader_bid_1.TraderBid.confirmBid(data);
    res.send({});
});
