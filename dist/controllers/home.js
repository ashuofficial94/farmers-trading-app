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
const user_1 = require("../model/user");
exports.getHomePage = (req, res, next) => {
    if (!req.session.user) {
        res.render("home", {
            pageTitle: "Home"
        });
    }
    else {
        console.log(req.session.user.userName + " already logged in");
        res.redirect("/dashboard");
    }
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
    res.redirect("/");
};
exports.loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.getUser(req.body.userName)
        .then((user) => {
        return user;
    })
        .catch((err) => {
        console.log(err);
    });
    if (!user) {
        console.log("No such user");
    }
    else {
        if (user.password === req.body.password) {
            req.session.user = user;
            console.log("Log in: " + req.session.user.userName);
            res.redirect("/dashboard");
            return;
        }
        else {
            console.log("Password doesn't match");
        }
    }
    res.redirect("/");
});
