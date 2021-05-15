"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../utils/database");
const ObjectID = require("mongodb").ObjectID;
class TransProposal {
    constructor(rate, userId) {
        this.rate = rate;
        this.userId = userId;
        this.bids = [];
    }
    save() {
        const db = database_1.getDb();
        db.collection("trans-proposals")
            .insertOne(this)
            .then((result) => {
            return result;
        })
            .catch((err) => {
            throw err;
        });
    }
    static getTransBids(transId) {
        const db = database_1.getDb();
        const bid_ids = db
            .collection("trans-proposals")
            .findOne({ _id: ObjectID(transId) })
            .then((result) => {
            return result;
        })
            .catch((err) => {
            throw err;
        });
        const bids = [];
        for (let bid_id in bid_ids) {
            bids.push(db
                .collection("trader-bids")
                .findOne({ _id: ObjectID(bid_id) })
                .then((result) => {
                return result;
            })
                .catch((err) => {
                throw err;
            }));
        }
        return bids;
    }
}
