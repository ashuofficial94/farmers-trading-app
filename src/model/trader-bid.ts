import { getDb } from "../utils/database";

const ObjectID = require("mongodb").ObjectID;

class TraderBid {
    proposalId: string;
    bidderId: string;
    bidAmount: number;
    status: "open" | "pending" | "accepted" | "rejected";

    constructor(proposalId: string, bidderId: string, bidAmount: number) {
        this.proposalId = proposalId;
        this.bidderId = bidderId;
        this.bidAmount = bidAmount;
        this.status = "open";
    }

    save() {
        const db = getDb();
        return db
            .collection("trader-bids")
            .insertOne(this)
            .then((response: any) => {
                return response;
            })
            .catch((err: Error) => {
                throw err;
            });
    }

    static getBidByProposal(proposalId: string) {
        const db = getDb();
        return db
            .collection("trader-bids")
            .find({ proposalId: proposalId })
            .toArray()
            .then((bids: Array<TraderBid>) => {
                return bids;
            })
            .catch((err: Error) => {
                throw err;
            });
    }

    static getBidByBidder(bidderId: string) {
        const db = getDb();
        return db
            .collection("trader-bids")
            .find({ bidderId: bidderId })
            .toArray()
            .then((bids: Array<TraderBid>) => {
                return bids;
            })
            .catch((err: Error) => {
                throw err;
            });
    }

    static acceptBid(bid: any, proposal: any) {
        const db = getDb();

        db.collection("trader-bids")
            .updateMany(
                { proposalId: proposal._id },
                { $set: { status: "rejected" } }
            )
            .then((result: any) => {
                return result;
            })
            .catch((err: Error) => {
                throw err;
            });

        db.collection("trader-bids")
            .updateOne(
                { _id: ObjectID(bid._id) },
                { $set: { status: "pending" } }
            )
            .then((result: any) => {
                return result;
            })
            .catch((err: Error) => {
                throw err;
            });

        const acceptedBid = {
            bidderId: bid.bidderId,
            bidAmount: bid.bidAmount,
        };

        db.collection("farmer-proposals")
            .updateOne(
                { _id: ObjectID(proposal._id) },
                { $set: { acceptedBid: acceptedBid, status: "pending" } }
            )
            .then((result: any) => {
                return result;
            })
            .catch((err: Error) => {
                throw err;
            });
    }

    static confirmBid(bid: any) {
        const db = getDb();

        db.collection("trader-bids")
            .updateOne(
                { _id: ObjectID(bid._id) },
                { $set: { status: "accepted" } }
            )
            .then((result: any) => {
                return result;
            })
            .catch((err: Error) => {
                throw err;
            });

        db.collection("farmer-proposals")
            .updateOne(
                { _id: ObjectID(bid.proposalId) },
                { $set: { status: "resolved" } }
            )
            .then((result: any) => {
                return result;
            })
            .catch((err: Error) => {
                throw err;
            });
    }
}

export { TraderBid };
