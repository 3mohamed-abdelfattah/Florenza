function displayOrderItems() {
    const itemsContainer = document.getElementById('items-container');
    const basket = JSON.parse(localStorage.getItem('basket')) || [];

    itemsContainer.innerHTML = '';
    let subtotal = 0;
    const shipping = 25;

    if (basket.length === 0) {
        itemsContainer.innerHTML = '<p>No items in your cart.</p>';
    } else {
        basket.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('order-item');

            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            itemDiv.innerHTML = `
            <span class='flex p-2 hr_line'>
                <button onclick="removeItem(${index})" class="mr-2">
                    <img src='../assets/img/icons/delete.svg' class='w-5'>
                </button>
                <img class='w-20 border' src="../assets/img/${item.image}" alt="${item.title}">
                <div class="flex justify-between w-full">
                    <span class='flex flex-col items-left gap-1 p-2'>
                        <span class="text-sm font-semibold">${item.title}</span>
                        <span class='text-sm'>Quantity (${item.quantity})</span>    
                        <span class='text-sm'>$${item.price}</span>    
                    </span>
                    <span class="flex font-semibold items-center">$${Math.round(itemTotal)}</span>
                </div>
            </span>
            `;
            itemsContainer.appendChild(itemDiv);
        });
    }

    document.querySelector('.buy-des-right').textContent = `$${subtotal.toFixed(2)}`;
    const total = Math.round(subtotal + shipping + 5);
    document.querySelector('.total-price-r').textContent = `$${total.toFixed(2)}`;
}

const basket = JSON.parse(localStorage.getItem('basket')) || [];
// Remove item from basket and update display
function removeItem(index) {
    basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basket));
    displayOrderItems();
}

document.addEventListener('DOMContentLoaded', displayOrderItems);

// Handle form submission
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.querySelector('input[placeholder="Your Name"]').value;
    const email = document.querySelector('input[placeholder="Your Email"]').value;
    const phone = document.querySelector('input[placeholder="Your phone number*"]').value;
    const street = document.querySelector('input[placeholder="Street"]').value;
    const apartment = document.querySelector('input[placeholder="Apartment Number"]').value;

    if (name && email && phone && street && apartment) {
        const orderData = { name, email, phone, street, apartment, basket };
        localStorage.setItem('userInfo', JSON.stringify(orderData));

        Toastify({
            text: "Order placed successfully!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#4caf50",
        }).showToast();

        localStorage.removeItem('basket');
        displayOrderItems();

        setTimeout(() => {
            window.location.href = "../index.html";
        }, 3000);
    } else {
        alert("Please fill out all the required fields.");
    }
});

// Input validation
const userchk = /^[a-zA-Z0-9_.]{3,15}$/;
const emailchk = /^[a-zA-Z]{3,}[a-zA-Z0-9_.]*@[a-zA-Z]{3,}\.[a-zA-Z]{2,}$/;
const phonechk = /^01[0125][0-9]{8}$/;

const invalidName = document.querySelector('input[placeholder="Your Name"]');
const invalidEmail = document.querySelector('input[placeholder="Your Email"]');
const invalidPhone = document.querySelector('input[placeholder="Your phone number*"]');

function validateInput(inputElement, regex, errorMessage) {
    if (!regex.test(inputElement.value)) {
        inputElement.classList.add("border-red-500");
        inputElement.nextElementSibling.textContent = errorMessage;
    } else {
        inputElement.classList.remove("border-red-500");
        inputElement.nextElementSibling.textContent = "";
    }
}

invalidName.addEventListener('input', function () {
    validateInput(invalidName, userchk, "Invalid name format");
});

invalidEmail.addEventListener('input', function () {
    validateInput(invalidEmail, emailchk, "Invalid email format");
});

invalidPhone.addEventListener('input', function () {
    validateInput(invalidPhone, phonechk, "Invalid phone number format");
});