"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = (req, res, next) => {
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
