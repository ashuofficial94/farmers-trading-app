const openBidsContent = document.querySelector("#open-bids");
const resolvedBidsContent = document.querySelector("#resolved-bids");
const pendingBidsContent = document.querySelector("#pending-bids");

window.onload = getBids;

async function getBids(user) {
    const bids = await fetch("/get-bidder-bid", {
        method: "GET",
        header: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((bids) => {
            return bids;
        });
    
    console.log(bids);
}
