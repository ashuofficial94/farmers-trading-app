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
    static acceptBid(bid, proposal) {
        const db = database_1.getDb();
        db.collection("trader-bids")
            .updateMany({ proposalId: proposal._id }, { $set: { status: "rejected" } })
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
        db.collection("trader-bids")
            .updateOne({ _id: ObjectID(bid._id) }, { $set: { status: "pending" } })
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
        const acceptedBid = {
            bidderId: bid.bidderId,
            bidAmount: bid.bidAmount,
        };
        db.collection("farmer-proposals")
            .update({ _id: ObjectID(proposal._id) }, { $set: { acceptedBid: acceptedBid, status: "pending" } })
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
    }
}
exports.TraderBid = TraderBid;
