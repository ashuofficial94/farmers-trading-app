import { Request, Response, NextFunction } from "express";
import { FarmerProposal } from "../model/farmer-proposal";
import { TraderBid } from "../model/trader-bid";

exports.getDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session.user) {
        console.log("No user logged in");
        res.redirect("/");
        return;
    }
    const proposals = await FarmerProposal.fetchAll();
    res.render("dashboard", {
        pageTitle: "Dashboard",
        tabTitle: "feed",
        user: req.session.user,
        proposals: proposals,
    });
};

exports.logout = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) {
        console.log("No user logged in");
        res.redirect("/");
        return;
    }
    console.log("Log out: " + req.session.user.userName);
    req.session.destroy((err: Error) => {
        if (err) console.log(err);
    });
    res.redirect("/");
};

exports.getProposals = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const proposals = await FarmerProposal.getUserProposals(
        req.session.user.userName
    )
        .then((proposals: Array<FarmerProposal>) => {
            return proposals;
        })
        .catch((err: Error) => {
            console.log(err);
        });

    res.send(proposals);
};

exports.getFarmerProposalsPage = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.render("dashboard", {
        pageTitle: "Dashboard",
        tabTitle: "farmer-proposals",
        user: req.session.user,
    });
};

exports.addFarmerProposal = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.body.username;
    const crop = req.body.crop;
    const basePrice = req.body.basePrice;
    const state = req.body.state;
    const city = req.body.city;

    const proposal = new FarmerProposal(userId, crop, basePrice, state, city);
    proposal.save();

    res.redirect("/my-proposals");
};

exports.closeProposal = async (req: Request, res: Response, next: NextFunction) => {
    const response = await FarmerProposal.closeProposal(req.body._id);
    return response;
};

exports.placeBid = (req: Request, res: Response, next: NextFunction) => {
    const proposalId = req.body.proposalId;
    const bidderId = req.session.user.userName;
    const bidAmount = parseInt(req.body.bidAmount.substring(1));
    
    const bid = new TraderBid(proposalId, bidderId, bidAmount);
    bid.save()
    res.redirect("/dashboard");
};

exports.getProposalBid = async (req: Request, res: Response, next: NextFunction) => {
    const proposalId = req.body;
    const bids = await TraderBid.getBidByProposal(proposalId);
    res.send(bids);
}

exports.acceptBid = (req: Request, res: Response, next: NextFunction) => {
    const data = JSON.parse(req.body);
    TraderBid.acceptBid(data.bid, data.proposal);
    res.send({});
}