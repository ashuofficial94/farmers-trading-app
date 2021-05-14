import { Request, Response, NextFunction } from "express";
import { User } from "../model/user";

declare module "express-session" {
    interface Session {
        user: User;
    }
}

declare module "express" {
    export interface Request {
        users: any;
    }
}

exports.getHomePage = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) {
        res.render("home", {
            pageTitle: "Home"
        });
    } else {
        console.log(req.session.user.userName + " already logged in");
        res.redirect("/dashboard");
    }
};

exports.addUser = (req: Request, res: Response, next: NextFunction) => {
    const userName = req.body.userName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const contact = req.body.contact;
    const role = req.body.role;
    const password = req.body.password;

    const user = new User(
        userName,
        firstName,
        lastName,
        contact,
        role,
        password
    );
    user.save();
    res.redirect("/");
};

exports.loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = await User.getUser(req.body.userName)
        .then((user: User) => {
            return user;
        })
        .catch((err: Error) => {
            console.log(err);
        });

    if (!user) {
        console.log("No such user");
    } else {
        if (user.password === req.body.password) {
            req.session.user = user;
            console.log("Log in: " + req.session.user.userName);
            res.redirect("/dashboard");
            return;
        } else {
            console.log("Password doesn't match");
        }
    }
    res.redirect("/");
};
