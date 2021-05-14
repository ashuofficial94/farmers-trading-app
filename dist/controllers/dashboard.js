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
