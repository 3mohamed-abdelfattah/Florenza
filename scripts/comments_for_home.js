const comments = [
    { name: "Ronald Richards", text: "Ordered flowers online and they were the best bouquet! Impressed everyone around. Highly recommend this flower shop!" },
    { name: "Emily Clark", text: "The arrangements are stunning! The flowers were fresh, beautifully arranged, and delivered on time. Will definitely order again." },
    { name: "Michael Brown", text: "Amazing service! The bouquet looked even better in person than on the website. My wife loved it. Thank you!" },
    { name: "Sarah Johnson", text: "I loved the unique mix of fresh and dried flowers in the bouquet I ordered. Great for any occasion. Highly recommended!" },
    { name: "David Wilson", text: "Excellent customer service and the quality of the flowers was exceptional. Will be using this shop for all future occasions." }
];

let currentIndex = 0;
let dots;

// Update the comment and name based on current index
function updateComment() {
    document.getElementById("commentText").innerHTML = `“${comments[currentIndex].text}”`;
    document.getElementById("commentName").innerHTML = `– ${comments[currentIndex].name}`;
}

// Update the active dot indicator
function updateDots() {
    Array.from(dots).forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
}

// Automatically rotate comments every 2 seconds
const dotInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % comments.length;
    updateComment();
    updateDots();
}, 2000);

// Set up navigation buttons
document.getElementById("Left-arrow-review").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + comments.length) % comments.length;
    updateComment();
    updateDots();
});

document.getElementById("Right-arrow-review").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % comments.length;
    updateComment();
    updateDots();
});

// Initialize dots and display the first comment
window.onload = function () {
    dots = document.getElementsByClassName("dot");
    updateComment();
    updateDots();
};

// Number validation logic
const chkValidNumber = /^\+?[0-9]+$/;
const validNumber = document.getElementById("valid-number");
const btnValidNumber = document.getElementById("btnvalid-number");
const invalidMessage = document.getElementById("invalidMessage");

// Validate number format on button click
btnValidNumber.addEventListener("click", function (e) {
    if (!chkValidNumber.test(validNumber.value)) {
        e.preventDefault();
    }
});

// Show validation message as user types
validNumber.addEventListener("input", function () {
    if (!chkValidNumber.test(validNumber.value)) {
        invalidMessage.innerHTML = "* Invalid number format";
        invalidMessage.style.color = "red";
    } else {
        invalidMessage.innerHTML = "We will call you back";
        invalidMessage.style.color = "rgba(18, 18, 18, 0.7)";
    }
});