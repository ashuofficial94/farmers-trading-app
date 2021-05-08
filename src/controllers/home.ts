import { Request, Response, NextFunction } from "express";
import { User } from "../model/user";

exports.getHomePage = (req: Request, res: Response, next: NextFunction) => {
    res.render("home", {
        pageTitle: "Home",
    });
};

exports.addUser = (req: Request, res: Response, next: NextFunction) => {
    const userName = req.body.userName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const contact = req.body.contact;
    const role = req.body.role;
    const password = req.body.password;

    const user = new User(userName, firstName, lastName, contact, role, password);
    user.save();

    console.log(User.fetchAll());
    res.redirect('/');
};
