// event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("focus", showSuggestedPassword);
document.querySelector("#signupForm").addEventListener("submit", function(event) {
    validateForm(event);
});

loadStates();

// functions
async function displayCity() {
    let zip = document.querySelector("#zip").value;
    let url =  `https://csumb.space/api/cityInfoAPI.php?zip=${zip}`;
    let response = await fetch(url);
    let data = await response.json();

    if (data == false) {
        document.querySelector("#zipError").innerHTML = "Zip code not found!";
        document.querySelector("#zipError").style.color = "red";
        document.querySelector("#city").innerHTML = "";
        document.querySelector("#latitude").innerHTML = "";
        document.querySelector("#longitude").innerHTML = "";
    } else {
        document.querySelector("#zipError").innerHTML = "";
        document.querySelector("#city").innerHTML = data.city;
        document.querySelector("#latitude").innerHTML = data.latitude;
        document.querySelector("#longitude").innerHTML = data.longitude;
    }
}

async function loadStates() {
    let response = await fetch("https://csumb.space/api/allStatesAPI.php");
    let data = await response.json();
    let stateDropdown = document.querySelector("#state");
    for (let i of data) {
        stateDropdown.innerHTML += `<option value="${i.abbreviation}">${i.state}</option>`;
    }
}

async function displayCounties() {
    let state = document.querySelector("#state").value;

    if (state == "") {
        return;
    }

    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>";
    for (let i of data) {
        countyList.innerHTML += `<option>${i.county}</option>`;
    }
}

async function checkUsername () {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let msg = document.querySelector("#usernameError");
    if (data.available) {
        msg.innerHTML = "Username available!";
        msg.style.color = "green";
    } else {
        msg.innerHTML = "Username taken!";
        msg.style.color = "red";
    }
}

async function showSuggestedPassword() {
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    let response = await fetch(url);
    let data = await response.json();
    document.querySelector("#suggestedPwd").innerHTML = "Suggested: " + data.password;
}

function validateForm(e) {
    let isValid = true;

    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let password2 = document.querySelector("#password2").value;
    let pwdError = document.querySelector("#passwordError");

    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username required!";
        document.querySelector("#usernameError").style.color = "red";
        isValid = false;
    }

    // check length
    if (password.length < 6) {
        pwdError.innerHTML = "Password must be at least 6 characters!";
        pwdError.style.color = "red";
        isValid = false;
    } else if (password !== password2) {
        pwdError.innerHTML = "Passwords do not match!";
        pwdError.style.color = "red";
        isValid = false;
    } else {
        pwdError.innerHTML = "";
    }

    if (!isValid) {
        e.preventDefault();
    }
}