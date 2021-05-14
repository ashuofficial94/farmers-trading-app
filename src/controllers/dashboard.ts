import { Request, Response, NextFunction } from "express";
import { FarmerProposal } from "../model/farmer-proposal";

exports.getDashboard = async (req: Request, res: Response, next: NextFunction) => {
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
    const proposals = await FarmerProposal.fetchAll()
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
