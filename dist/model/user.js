"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const database_1 = require("../utils/database");
class User {
    constructor(userName, firstName, lastName, contact, role, password) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
        this.contact = contact;
    }
    save() {
        const db = database_1.getDb();
        db.collection("users")
            .insertOne(this)
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
    }
    static fetchAll() {
        const db = database_1.getDb();
        return db
            .collection("users")
            .find()
            .toArray()
            .then((users) => {
            return users;
        })
            .catch((err) => {
            console.log(err);
            throw err;
        });
    }
    static getUser(userName) {
        const db = database_1.getDb();
        return db
            .collection("users")
            .find({ userName: userName })
            .next()
            .then((user) => {
            return user;
        })
            .catch((err) => {
            console.log(err);
            throw err;
        });
    }
}
exports.User = User;
