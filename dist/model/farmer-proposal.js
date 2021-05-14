"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmerProposal = void 0;
const database_1 = require("../utils/database");
class FarmerProposal {
    constructor(userId, crop, basePrice, state, city) {
        this.userId = userId;
        this.crop = crop;
        this.basePrice = basePrice;
        this.state = state;
        this.city = city;
        this.startDate = new Date();
        this.status = "open";
        this.bids = [];
    }
    save() {
        const db = database_1.getDb();
        db.collection("farmer-proposals")
            .insertOne(this)
            .then((result) => {
            console.log(result);
        })
            .catch((err) => {
            console.log(err);
        });
    }
    static fetchAll() {
        const db = database_1.getDb();
        return db
            .collection("farmer-proposals")
            .find()
            .toArray()
            .then((proposals) => {
            return proposals;
        })
            .catch((err) => {
            console.log(err);
            throw err;
        });
    }
    static getUserProposals(userId) {
        const db = database_1.getDb();
        return db
            .collection("farmer-proposals")
            .find({ userId: userId })
            .toArray()
            .then((proposals) => {
            return proposals;
        })
            .catch((err) => {
            console.log(err);
            throw err;
        });
    }
    static addBid(userId, bidderId, bidAmount) {
        const db = database_1.getDb();
        db.collection("farmer-proposals")
            .updateOne({ userId: userId }, {
            $push: {
                bids: {
                    bidderId: bidderId,
                    bidAmount: bidAmount,
                },
                $sort: { bidAmount: -1 },
            },
        })
            .then((result) => {
            console.log(result);
        })
            .catch((err) => {
            console.log(err);
            throw err;
        });
    }
    static getBids(bidderId) {
        const db = database_1.getDb();
        return db
            .collection("farmer-proposals")
            .find({ bidderId: bidderId })
            .toArray()
            .then((proposals) => {
            return proposals;
        })
            .catch((err) => {
            console.log(err);
            throw err;
        });
    }
}
exports.FarmerProposal = FarmerProposal;
