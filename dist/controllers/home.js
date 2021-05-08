"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
exports.getHomePage = (req, res, next) => {
    res.render("home", {
        pageTitle: "Home",
    });
};
exports.addUser = (req, res, next) => {
    const userName = req.body.userName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const contact = req.body.contact;
    const role = req.body.role;
    const password = req.body.password;
    const user = new user_1.User(userName, firstName, lastName, contact, role, password);
    user.save();
    console.log(user_1.User.fetchAll());
    res.redirect('/');
};
