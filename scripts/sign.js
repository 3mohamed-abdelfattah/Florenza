// Inputs Verification 
var userCheck = /^[a-zA-Z0-9_.]{6,20}$/
var passCheck = /^[a-zA-Z0-9_.]{6,}$/
var username = document.forms[0][0]
var password = document.forms[0][1]
var invalidUser = document.getElementById("labuser")
var invalidPass = document.getElementById("labpass")

document.getElementById("btn").addEventListener('click', function (e) {
    const isUsernameValid = userCheck.test(username.value);
    const isPasswordValid = passCheck.test(password.value);

    // Helper function to set validation messages
    function setValidationMessage(element, message, color) {
        element.innerHTML = message;
        element.style.color = color;
    }

    if (!isUsernameValid && !isPasswordValid) {
        e.preventDefault();
        setValidationMessage(invalidUser, "invalid username", "red");
        setValidationMessage(invalidPass, "invalid password", "red");
    }
    else if (!isUsernameValid) {
        e.preventDefault();
        setValidationMessage(invalidUser, "invalid username", "red");
        setValidationMessage(invalidPass, "", "white");
    }
    else if (!isPasswordValid) {
        e.preventDefault();
        setValidationMessage(invalidPass, "invalid password", "red");
        setValidationMessage(invalidUser, "", "white");
    }
});


//  User Authentication
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('../data/ourUsers.json')
        .then(response => response.json())
        .then(data => {
            const users = data.users;

            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('isLoggedIn', 'true');
                // Toastify for Success
                Toastify({
                    text: "Login successful!",
                    duration: 1000,
                    close: true,
                    gravity: "top",
                    position: "left",
                    backgroundColor: "#627211b6",
                }).showToast();

                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1000);

            } else {
                // Toastify for Failure
                Toastify({
                    text: "Incorrect username or password.",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "left",
                    backgroundColor: "#ff5f6d",
                }).showToast();
            }
        })
        .catch(error => {
            console.error('Error loading users:', error);
        });
});