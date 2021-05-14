import { getDb } from "../utils/database";

class FarmerProposal {
    userId: string;
    crop: string;
    startDate: Date;
    basePrice: number;
    state: string;
    city: string;
    status: string;
    bids: Array<Object>;

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
        this.bids = [];
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

    static addBid(userId: string, bidderId: string, bidAmount: number) {
        const db = getDb();
        db.collection("farmer-proposals")
            .updateOne(
                { userId: userId },
                {
                    $push: {
                        bids: {
                            bidderId: bidderId,
                            bidAmount: bidAmount,
                        },
                        $sort: { bidAmount: -1 },
                    },
                }
            )
            .then((result: object) => {
                console.log(result);
            })
            .catch((err: Error) => {
                console.log(err);
                throw err;
            });
    }

    static getBids(bidderId: string) {
        const db = getDb();
        return db
            .collection("farmer-proposals")
            .find({ bidderId: bidderId })
            .toArray()
            .then((proposals: Array<FarmerProposal>) => {
                return proposals;
            })
            .catch((err: Error) => {
                console.log(err);
                throw err;
            });
    }
}

export { FarmerProposal };
