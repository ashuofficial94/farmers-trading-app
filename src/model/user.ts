let users: Array<User> = [];

class User {
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    contact: string;

    constructor(
        userName: string,
        firstName: string,
        lastName: string,
        contact: string,
        role: string,
        password: string
    ) {
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
};

export {User};
