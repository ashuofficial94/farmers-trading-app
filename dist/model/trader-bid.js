"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraderBid = void 0;
const database_1 = require("../utils/database");
const ObjectID = require("mongodb").ObjectID;
class TraderBid {
    constructor(proposalId, bidderId, bidAmount) {
        this.proposalId = proposalId;
        this.bidderId = bidderId;
        this.bidAmount = bidAmount;
        this.bidStatus = "open";
    }
    save() {
        const db = database_1.getDb();
        return db
            .collection("trader-bids")
            .insertOne(this)
            .then((response) => {
            return response;
        })
            .catch((err) => {
            throw err;
        });
    }
    static getBidByProposal(proposalId) {
        const db = database_1.getDb();
        return db
            .collection("trader-bids")
            .find({ proposalId: proposalId })
            .toArray()
            .then((bids) => {
            return bids;
        })
            .catch((err) => {
            console.log(err);
            throw err;
        });
    }
    static getBidByBidder(bidderId) {
        const db = database_1.getDb();
        return db
            .collection("trader-bids")
            .find({ bidderId: bidderId })
            .toArray()
            .then((bids) => {
            return bids;
        })
            .catch((err) => {
            throw err;
        });
    }
}
exports.TraderBid = TraderBid;
