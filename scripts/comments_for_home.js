// Arrays for the comments
var arrcommentName = [
    "Ronald Richards",
    "Emily Clark",
    "Michael Brown",
    "Sarah Johnson",
    "David Wilson"
];
var arrcommentText = [
    "Ordered flowers online and they were the best bouquet! Impressed everyone around. Highly recommend this flower shop!",
    "The arrangements are stunning! The flowers were fresh, beautifully arranged, and delivered on time. Will definitely order again.",
    "Amazing service! The bouquet looked even better in person than on the website. My wife loved it. Thank you!",
    "I loved the unique mix of fresh and dried flowers in the bouquet I ordered. Great for any occasion. Highly recommended!",
    "Excellent customer service and the quality of the flowers was exceptional. Will be using this shop for all future occasions."
];

var i = 0;
var dots;

function updateComment() {
    document.getElementById("commentText").innerHTML = `“${arrcommentText[i]}”`;
    document.getElementById("commentName").innerHTML = `– ${arrcommentName[i]}`;
}

function updateDots() {
    // Remove active to current dot
    for (var j = 0; j < dots.length; j++) {
        dots[j].classList.remove("active");
    }

    // Add active to current dot
    dots[i].classList.add("active");

    // Move to the next dot
    i = (i + 1) % arrcommentName.length;
}

// update dots every 2 seconds
var dotInterval = setInterval(function () {
    updateDots();
    updateComment(); 
}, 2000);

// Left and right navigation buttons
document.getElementById("Left-arrow-review").addEventListener("click", function () {
    i = (i - 1 + arrcommentName.length) % arrcommentName.length;
    updateComment();
});

document.getElementById("Right-arrow-review").addEventListener("click", function () {
    i = (i + 1) % arrcommentName.length;
    updateComment();
});

// Add active class to the first dot
window.onload = function () {
    dots = document.getElementsByClassName("dot"); 
    updateComment();
    updateDots(); 
};

// Number validation logic
var chkvalidNumber = /^\+?[0-9]+$/;
var validNumber = document.getElementById("valid-number");
var btnvalidNumber = document.getElementById("btnvalid-number");
var invalidmessage = document.getElementById("invalidMessage");

btnvalidNumber.addEventListener("click", function (e) {
    if (!chkvalidNumber.test(validNumber.value)) {
        e.preventDefault();
    }
});

validNumber.addEventListener("input", function () {
    if (!chkvalidNumber.test(validNumber.value)) {
        invalidmessage.innerHTML = "* Invalid number format";
        invalidmessage.style.color = "red";
    } else {
        invalidmessage.innerHTML = "We will call you back";
        invalidmessage.style.color = "rgb(18 18 18 / 0.7)";
    }
});
