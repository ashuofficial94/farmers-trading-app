const infoPanel = document.querySelector("#info-panel");
const infoHeader = document.querySelector("#info-header");
const infoContent = document.querySelector("#info-content");

function getBids(proposal) {
    infoContent.innerHTML = "";
    infoContent.classList.add("w3-animate-right");
    setTimeout(function () {
        infoContent.classList.remove("w3-animate-right");
    }, 500);

    infoHeader.innerHTML = "Current Bids";
    proposal = JSON.parse(proposal);

    if(proposal.bids.length == 0) {
        infoContent.innerHTML = "No Bids as of now!";
        return;
    }

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const rowh = document.createElement("tr");

    const col1h = document.createElement("th");
    const col2h = document.createElement("th");
    col1h.setAttribute("scope", "col");
    col2h.setAttribute("scope", "col");

    col1h.innerText = "Bidder ID"
    col2h.innerText = "Bidding Amount(₹)"

    rowh.appendChild(col1h);
    rowh.appendChild(col2h);
    thead.appendChild(rowh);
    table.appendChild(thead);

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
