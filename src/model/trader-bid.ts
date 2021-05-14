import { getDb } from "../utils/database";
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
}

export { TraderBid };
