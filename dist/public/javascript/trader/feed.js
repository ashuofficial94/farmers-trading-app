const infoPanel = document.querySelector("#info-panel");
const infoHeader = document.querySelector("#info-header");
const infoContent = document.querySelector("#info-content");

async function getBids(proposal) {
    infoContent.innerHTML = "";
    infoContent.classList.add("w3-animate-right");
    setTimeout(function () {
        infoContent.classList.remove("w3-animate-right");
    }, 500);

    infoHeader.innerHTML = "Current Bids";
    proposal = JSON.parse(proposal);
    const data = {
        proposalId: proposal._id,
    };

    const bids = await fetch("/get-proposal-bid", {
        method: "POST",
        header: {
            "Content-Type": "application/text",
        },
        body: proposal._id,
    })
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });

    if (bids.length == 0) {
        infoContent.innerText = "No bids as of now !";
        return;
    }

    bids.sort((a, b) => {
        return b.bidAmount - a.bidAmount;
    });

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const rowh = document.createElement("tr");

    const col1h = document.createElement("th");
    const col2h = document.createElement("th");

    col1h.innerText = "Bidder ID";
    col2h.innerText = "Bidding Amount(₹)";

    rowh.appendChild(col1h);
    rowh.appendChild(col2h);
    thead.appendChild(rowh);
    table.appendChild(thead);

    tbody = document.createElement("tbody");

    for (let bid of bids) {
        const row = document.createElement("tr");
        const col1 = document.createElement("td");
        const col2 = document.createElement("td");

        col1.innerText = bid.bidderId;
        col2.innerText = bid.bidAmount;

        row.appendChild(col1);
        row.appendChild(col2);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    table.classList.add("table", "table-striped");
    infoContent.appendChild(table);
}

function getDetails(proposal) {
    infoContent.innerHTML = "";
    infoContent.classList.add("w3-animate-right");
    setTimeout(function () {
        infoContent.classList.remove("w3-animate-right");
    }, 500);

    infoHeader.innerHTML = "Proposal Details";
    proposal = JSON.parse(proposal);

    const table = document.createElement("table");
    table.classList.add("table", "table-striped");

    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    property_names = {
        userId: "User ID",
        crop: "Crop",
        basePrice: "Base Price (₹)",
        state: "State",
        city: "City",
        status: "Status",
    };

    for (let property in property_names) {
        const row = document.createElement("tr");

        const col1 = document.createElement("td");
        const strong = document.createElement("strong");
        col1.appendChild(strong);
        strong.innerHTML = property_names[property];

        const col2 = document.createElement("td");
        col2.innerHTML = proposal[property];

        row.appendChild(col1);
        row.appendChild(col2);

        tbody.appendChild(row);
    }

    infoContent.appendChild(table);
}

function decreaseBid(proposal) {
    proposal = JSON.parse(proposal);
    const basePrice = parseInt(proposal.basePrice);
    const bidAmountElement = document.getElementById(
        "bid-amount-" + proposal._id
    );

    bidAmount = parseInt(bidAmountElement.value.substring(1));

    if (bidAmount == basePrice) {
        document.getElementById("decrease-bid-" + proposal._id).disabled = true;
        return;
    }

    bidAmount -= 100;
    document.getElementById("decrease-bid-" + proposal._id).disabled = false;
    bidAmountElement.value = "₹" + bidAmount;
}

function increaseBid(proposal) {
    proposal = JSON.parse(proposal);
    document.getElementById("decrease-bid-" + proposal._id).disabled = false;
    const bidAmountElement = document.getElementById(
        "bid-amount-" + proposal._id
    );

    bidAmount = parseInt(bidAmountElement.value.substring(1));
    bidAmount += 100;
    bidAmountElement.value = "₹" + bidAmount;
}
