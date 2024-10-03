var userchk = /^[a-zA-Z0-9_.]{6,20}$/
var passchk = /^[a-zA-Z0-9_.]{6,}$/
var username = document.forms[0][0]
var password = document.forms[0][1]
var invuser = document.getElementById("labuser")
var invpass = document.getElementById("labpass")
document.getElementById("btn").addEventListener('click',function (e) {
    if (!userchk.test(username.value) && !passchk.test(password.value)) {
        e.preventDefault()
        invuser.innerHTML="invaild username"
        invuser.style.color="red"
        invpass.innerHTML="invaild password"
        invpass.style.color="red"
    }
    else if (!userchk.test(username.value) && passchk.test(password.value)) {
        e.preventDefault()
        invuser.innerHTML="invaild username"
        invuser.style.color="red"
        invpass.innerHTML=""
        invpass.style.color="white"
    }
    else if (userchk.test(username.value) && !passchk.test(password.value)) {
        e.preventDefault()
        invpass.innerHTML="invaild password"
        invpass.style.color="red"
        invuser.innerHTML=""
        invuser.style.color="white"
    }
})