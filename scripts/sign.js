// Inputs Verification 
var userCheck = /^[a-zA-Z0-9_.]{6,20}$/
var passCheck = /^[a-zA-Z0-9_.]{6,}$/
var username = document.forms[0][0]
var password = document.forms[0][1]
var invalidUser = document.getElementById("labuser")
var invalidPass = document.getElementById("labpass")

document.getElementById("btn").addEventListener('click', function (e) {
    if (!userCheck.test(username.value) && !passCheck.test(password.value)) {
        e.preventDefault()
        invalidUser.innerHTML = "invalid username"
        invalidUser.style.color = "red"
        invalidPass.innerHTML = "invalid password"
        invalidPass.style.color = "red"
    }
    else if (!userCheck.test(username.value) && passCheck.test(password.value)) {
        e.preventDefault()
        invalidUser.innerHTML = "invalid username"
        invalidUser.style.color = "red"
        invalidPass.innerHTML = ""
        invalidPass.style.color = "white"
    }
    else if (userCheck.test(username.value) && !passCheck.test(password.value)) {
        e.preventDefault()
        invalidPass.innerHTML = "invalid password"
        invalidPass.style.color = "red"
        invalidUser.innerHTML = ""
        invalidUser.style.color = "white"
    }
})


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
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "left",
                    backgroundColor: "#627211b6",
                }).showToast();

                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 2100);

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
