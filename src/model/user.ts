import { getDb } from "../utils/database";

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
        const db = getDb();
        db.collection("users")
            .insertOne(this)
            .then((result: any) => console.log(result))
            .catch((err: Error) => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection("users")
            .find()
            .toArray()
            .then((users: Array<User>) => {
                return users;
            })
            .catch((err: Error) => {
                console.log(err);
                throw err;
            });
    }

    static getUser(userName: string) {
        const db = getDb();
        return db
            .collection("users")
            .find({ userName: userName })
            .next()
            .then((user: User) => {
                return user;
            })
            .catch((err: Error) => {
                console.log(err);
                throw err;
            });
    }
}

export { User };
