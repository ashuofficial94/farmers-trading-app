const openBidsContent = document.querySelector("#open-bids");
const resolvedBidsContent = document.querySelector("#resolved-bids");
const pendingBidsContent = document.querySelector("#pending-bids");

window.onload = getBids;

async function getBids(user) {
    const bids = await fetch("/get-bidder-bid", {
        method: "GET",
        header: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((bids) => {
            return bids;
        });

    for (let bid of bids) {
        const data = { proposalId: bid.proposalId };
        const proposal = await fetch("/get-proposal-id", {
            method: "POST",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                return response.json();
            })
            .then((proposal) => {
                return proposal;
            });

        const row = document.createElement("tr");
        const col1 = document.createElement("td");
        const col2 = document.createElement("td");
        const col3 = document.createElement("td");
        const col4 = document.createElement("td");
        const col5 = document.createElement("td");

        col1.innerText = proposal.crop;
        col2.innerText = proposal.userId;
        col3.innerText = proposal.basePrice;
        col4.innerText = bid.status;
        col5.innerText = bid.bidAmount;

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        row.appendChild(col4);
        row.appendChild(col5);

        if (bid.status === "pending") {
            const col6 = document.createElement("td");

            const button = document.createElement("button");
            button.classList.add("btn", "btn-success", "btn-sm", "rounded-pill");
            button.innerText = "Complete Bid";

            button.addEventListener("click", async(e) => {
                const avail = confirm('Do you want to avail transport service for this bid?');
                if(!avail) confirmBid(bid);
            });

            col6.appendChild(button);
            row.appendChild(col6);
            row.classList.add("table-warning");
            pendingBidsContent.appendChild(row);
        } else if (bid.status === "accepted") {
            row.classList.add("table-success");
            resolvedBidsContent.appendChild(row);
        } else if (bid.status === "rejected") {
            row.classList.add("table-danger");
            resolvedBidsContent.appendChild(row);
        } else if (bid.status === "open") {
            openBidsContent.appendChild(row);
        }
    }
}

async function confirmBid(bid) {
    fetch('/confirm-bid', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bid)
    }).then(location.reload());

    location.reload();
}
