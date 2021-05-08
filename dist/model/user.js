"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
let users = [];
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
        users.push(this);
    }
    static fetchAll() {
        return users;
    }
}
exports.User = User;
;
