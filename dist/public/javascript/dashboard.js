const proposals = fetch("/get-proposals")
    .then((response) => {
        return response.json();
    })
    .then((proposals) => {
        console.log(proposals);
    })
    .catch((err) => {
        console.log(err);
    });

