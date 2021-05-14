import { getDb } from "../utils/database";
import { FarmerProposal } from "./farmer-proposal";

const ObjectID = require("mongodb").ObjectID;

class TraderBid {
    proposalId: string;
    bidderId: string;
    bidAmount: number;
    bidStatus: "open" | "pending" | "accepted" | "rejected";

    constructor(proposalId: string, bidderId: string, bidAmount: number) {
        this.proposalId = proposalId;
        this.bidderId = bidderId;
        this.bidAmount = bidAmount;
        this.bidStatus = "open";
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
                console.log(err);
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
            .then((result: any) => console.log(result))
            .catch((err: Error) => console.log(err));

        db.collection("trader-bids")
            .updateOne({ _id: ObjectID(bid._id) }, { $set: { status: "pending" } })
            .then((result: any) => console.log(result))
            .catch((err: Error) => console.log(err));

        const acceptedBid = {
            bidderId: bid.bidderId,
            bidAmount: bid.bidAmount,
        };

        db.collection("farmer-proposals")
            .update(
                { _id: ObjectID(proposal._id) },
                { $set: { acceptedBid: acceptedBid, status: "pending" } }
            )
            .then((result: any) => console.log(result))
            .catch((err: Error) => console.log(err));
    }
}

export { TraderBid };
