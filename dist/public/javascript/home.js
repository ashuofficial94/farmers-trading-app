
function toggleCard() {
    const register_card_body = document.querySelector("#register-card-body");
    const login_card_body = document.querySelector("#login-card-body");

    if (register_card_body.style.display === "none") {
        register_card_body.style.display = "block";
        login_card_body.style.display = "none";
    } else {
        register_card_body.style.display = "none";
        login_card_body.style.display = "block";
    }
}
