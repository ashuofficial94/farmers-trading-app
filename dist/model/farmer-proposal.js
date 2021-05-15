"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmerProposal = void 0;
const database_1 = require("../utils/database");
const ObjectID = require("mongodb").ObjectID;
class FarmerProposal {
    constructor(userId, crop, basePrice, state, city) {
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
        const db = database_1.getDb();
        db.collection("farmer-proposals")
            .insertOne(this)
            .then((result) => {
            return result;
        })
            .catch((err) => {
            throw err;
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
            throw err;
        });
    }
    static getProposalById(proposalId) {
        const db = database_1.getDb();
        return db
            .collection("farmer-proposals")
            .findOne({ _id: ObjectID(proposalId) })
            .then((result) => {
            return result;
        })
            .catch((err) => {
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
            throw err;
        });
    }
    static closeProposal(proposalId) {
        const db = database_1.getDb();
        return db
            .collection("farmer-proposals")
            .updateOne({ _id: ObjectID(proposalId) }, { $set: { status: "closed" } })
            .then((result) => {
            return result;
        })
            .catch((err) => {
            throw err;
        });
    }
}
exports.FarmerProposal = FarmerProposal;
