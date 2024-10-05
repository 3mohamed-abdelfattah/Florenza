var arrcommentName = [
    "Ronald Richards",
    "Emily Clark",
    "Michael Brown",
    "Sarah Johnson",
    "David Wilson"
]
var arrcommentText = [
    "Ordered flowers online and they were the best bouquet! Impressed everyone around. Highly recommend this flower shop!",
    "The arrangements are stunning! The flowers were fresh, beautifully arranged, and delivered on time. Will definitely order again.",
    "Amazing service! The bouquet looked even better in person than on the website. My wife loved it. Thank you!",
    "I loved the unique mix of fresh and dried flowers in the bouquet I ordered. Great for any occasion. Highly recommended!",
    "Excellent customer service and the quality of the flowers was exceptional. Will be using this shop for all future occasions."
]
var i = 0;
setInterval(function () {
    i++
    if (i > 4) {
        i = 0
        document.getElementById("commentText").innerHTML = `“${arrcommentText[i]}”`
        document.getElementById("commentName").innerHTML = `– ${arrcommentName[i]}`

    }
    else {
        document.getElementById("commentText").innerHTML = `“${arrcommentText[i]}”`
        document.getElementById("commentName").innerHTML = `– ${arrcommentName[i]}`
    }
}, 2000)
document.getElementById("Left-arrow-review").addEventListener("click", function () {
    i++
    if (i > 4) {
        i = 0
        document.getElementById("commentText").innerHTML = `“${arrcommentText[i]}”`
        document.getElementById("commentName").innerHTML = `– ${arrcommentName[i]}`
    }
    else {
        document.getElementById("commentText").innerHTML = `“${arrcommentText[i]}”`
        document.getElementById("commentName").innerHTML = `– ${arrcommentName[i]}`
    }
})
document.getElementById("Right-arrow-review").addEventListener("click", function () {

    i--
    if (i < 0) {
        i = 4
        document.getElementById("commentText").innerHTML = `“${arrcommentText[i]}”`
        document.getElementById("commentName").innerHTML = `– ${arrcommentName[i]}`
    }
    else {
        document.getElementById("commentText").innerHTML = `“${arrcommentText[i]}”`
        document.getElementById("commentName").innerHTML = `– ${arrcommentName[i]}`
    }
})
var chkvalidNumber = /^\+?[0-9]+$/
var validNumber = document.getElementById("valid-number")
var btnvalidNumber = document.getElementById("btnvalid-number")
var invalidmessage = document.getElementById("invalidMessage")
btnvalidNumber.addEventListener("click", function (e) {
    if (!chkvalidNumber.test(validNumber.value)) {
        e.preventDefault()
    }
})
validNumber.addEventListener("input", function () {
    if (!chkvalidNumber.test(validNumber.value)) {
        invalidmessage.innerHTML = "*"
        invalidmessage.style.color = "red"
    }
    else {
        invalidmessage.innerHTML = "We will call you back"
        invalidmessage.style.color = "rgb(18 18 18 / 0.7)"
    }
})
