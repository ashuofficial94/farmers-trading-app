import session = require("express-session");

import { Request, Response, NextFunction } from "express";

exports.getDashboard = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) {
        console.log("No user logged in");
        res.redirect("/");
        return;
    }
    console.log("Log in: " + req.session.user.userName);
    res.render("dashboard", {
        pageTitle: "Dashboard",
        user: req.session.user,
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
