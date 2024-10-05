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
            <button onclick="removeItem(${index})" class="mr-2"><img src='../assets/img/icons/delete-svgrepo-com.svg' class='w-5'></button>
                <img class='w-20 border' src="${item.image}" alt="${item.title}" class="order-item-image">
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

// remove item from localStorage
function removeItem(index) {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basket));
    displayOrderItems();
}

document.addEventListener('DOMContentLoaded', displayOrderItems);

// handle the form submission
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.querySelector('input[placeholder="Your Name"]').value;
    const email = document.querySelector('input[placeholder="Your Email"]').value;
    const phone = document.querySelector('input[placeholder="Your phone number*"]').value;
    const street = document.querySelector('input[placeholder="Street"]').value;
    const apartment = document.querySelector('input[placeholder="Apartment Number"]').value;

    if (name && email && phone && street && apartment) {
        const orderData = {
            name,
            email,
            phone,
            street,
            apartment,
        };

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

// // validation
// var userchk = /^[a-zA-Z0-9_.]{3,15}$/
// var emailchk = /^[a-zA-Z]{3,}[a-zA-Z0-9_.]*@[a-zA-Z]{3,}.[a-zA-Z]{3,}$/
// var phonechk = /^01[0125][0-9]{8}$/
// var invalidname1 = document.forms[0][0]
// var invalidemail = document.forms[0][1]
// var invalidphone = document.forms[0][2]
// var invalidrecname = document.forms[0][3]
// var invalidrecphone = document.forms[0][4]
// // submit validation
// document.getElementById("btn-sub").addEventListener('click', function (e) {
//     if (!userchk.test(invalidname1.value) ||
//         !emailchk.test(invalidemail.value) ||
//         !phonechk.test(invalidphone.value) ||
//         !userchk.test(invalidrecname.value) ||
//         !phonechk.test(invalidrecphone.value)) {
//         e.preventDefault()
//     }
// }
// )
// // input validation       not working
// invalidname1.addEventListener('input', function () {
//     if (!userchk.test(invalidname1.value)) {
//         invalidname1.class = "border-red"
//     }
// }
// )
// invalidemail.addEventListener('input', function () {
//     if (!emailchk.test(invalidemail.value)) {
//         invalidemail.class = "border-red"
//     }
// }
// )
// invalidphone.addEventListener('input', function () {
//     if (!phonechk.test(invalidphone.value)) {
//         invalidphone.class = "border-red"
//     }
// }
// )
// invalidrecname.addEventListener('input', function () {
//     if (!userchk.test(invalidrecname.value)) {
//         invalidrecname.class = "border-red"
//     }
// }
// )
// invalidrecphone.addEventListener('input', function () {
//     if (!phonechk.test(invalidrecphone.value)) {
//         invalidrecphone.class = "border-red"
//     }
// }
// )