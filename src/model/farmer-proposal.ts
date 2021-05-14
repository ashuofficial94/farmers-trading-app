import { getDb } from "../utils/database";
const ObjectID = require('mongodb').ObjectID

class FarmerProposal {
    userId: string;
    crop: string;
    startDate: Date;
    basePrice: number;
    state: string;
    city: string;
    status: string;
    acceptedBid: object;

    constructor(
        userId: string,
        crop: string,
        basePrice: number,
        state: string,
        city: string
    ) {
        this.userId = userId;
        this.crop = crop;
        this.basePrice = basePrice;
        this.state = state;
        this.city = city;
        this.startDate = new Date();
        this.status = "open";
        this.acceptedBid = {};
    }

    save() {
        const db = getDb();
        db.collection("farmer-proposals")
            .insertOne(this)
            .then((result: any) => {
                console.log(result);
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection("farmer-proposals")
            .find()
            .toArray()
            .then((proposals: FarmerProposal[]) => {
                return proposals;
            })
            .catch((err: Error) => {
                console.log(err);
                throw err;
            });
    }

    static getUserProposals(userId: string) {
        const db = getDb();
        return db
            .collection("farmer-proposals")
            .find({ userId: userId })
            .toArray()
            .then((proposals: Array<FarmerProposal>) => {
                return proposals;
            })
            .catch((err: Error) => {
                console.log(err);
                throw err;
            });
    }
   
    static closeProposal(proposalId: string) {
        const db = getDb();
        return db
            .collection("farmer-proposals")
            .updateOne(
                { "_id": ObjectID(proposalId) },
                { $set: { status: "closed" } }
            )
            .then((result: any) => {
                return result;
            })
            .catch((err: Error) => {
                console.log(err);
                throw err;
            });
    }
}

export { FarmerProposal };
