import { getDb } from "../utils/database";

const ObjectID = require("mongodb").ObjectID;

class TransProposal {
    rate: string;
    userId: string;
    bids: Array<string>;

    constructor(rate: string, userId: string) {
        this.rate = rate;
        this.userId = userId;
        this.bids = [];
    }

    save() {
        const db = getDb();

        db.collection("trans-proposals")
            .insertOne(this)
            .then((result: any) => {
                return result;
            })
            .catch((err: Error) => {
                throw err;
            });
    }

    static getTransBids(transId: string) {
        const db = getDb();

        const bid_ids = db
            .collection("trans-proposals")
            .findOne({ _id: ObjectID(transId) })
            .then((result: Array<string>) => {
                return result;
            })
            .catch((err: Error) => {
                throw err;
            });

        const bids = [];
        for (let bid_id in bid_ids) {
            bids.push(
                db
                    .collection("trader-bids")
                    .findOne({ _id: ObjectID(bid_id) })
                    .then((result: any) => {
                        return result;
                    })
                    .catch((err: Error) => {
                        throw err;
                    })
            );
        }

        return bids;
    }
}
