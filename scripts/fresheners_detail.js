const params = new URLSearchParams(window.location.search);
const flowerId = params.get('id');

fetch('../../data/itemData.json')
    .then(response => response.json())
    .then(data => {
        const flower = data.categories.find(category => category.category === 'Fresheners')
            .items.find(item => item.id == flowerId);

        if (flower) {
            document.getElementById('flower-title').innerText = flower.title;
            document.getElementById('flower-price').innerText = `$${flower.price}`;
            document.getElementById('flower-description').innerText = flower.description;
            document.getElementById('flower-image').innerHTML = `
                <img src="../../assets/img/our_items/freshers/${flower.image}" class="sm:w-full sm:h-screen border object-cover" alt="${flower.title}">
            `;
            document.getElementById('one-time-price').innerText = flower.price;

            let combinations = flower.combinations || [];

            const manualCombinations = [
                { title: "Fountain", price: 145, image: "combination1.webp" },
                { title: "Verso Floor", price: 110, image: "combination2.png" },
                { title: "Lyingly glass", price: 80, image: "combination3.webp" },
                { title: "Hammershoi", price: 135, image: "combination4.webp" },
                { title: "Rattan Grapefruit", price: 48, image: "combination5.webp" },
                { title: "Lavender", price: 68, image: "combination6.webp" },
                { title: "Wild Mint", price: 58, image: "combination7.webp" },
                { title: "Rosewater", price: 76, image: "combination8.webp" },
            ];

            combinations = combinations.concat(manualCombinations);

            const combinationsContainer = document.getElementById('combinations');

            combinations.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('flex', 'flex-col', 'items-center', 'combination-item');
                div.innerHTML = `
                    <img src="../../assets/img/combination/${item.image}" class="object-cover" alt="${item.title}">
                    <p class="font-light">${item.title}</p>
                    <p class="text-gray-500 font-light">$${item.price}</p>
                    <div class="overlay">
                        <button class="add-to-basket-btn">Add to Basket</button>
                    </div>
                `;
                combinationsContainer.appendChild(div);
            });

            // Infinite scroll effect
            function duplicateItems() {
                const items = document.querySelectorAll('.combination-item');
                items.forEach(item => {
                    const clone = item.cloneNode(true);
                    combinationsContainer.appendChild(clone);
                });
            }

            duplicateItems();

            let scrollSpeed = 1;
            let scrollInterval = setInterval(autoScroll, 25);

            function autoScroll() {
                combinationsContainer.scrollLeft += scrollSpeed;

                if (combinationsContainer.scrollLeft + combinationsContainer.clientWidth >= combinationsContainer.scrollWidth) {
                    combinationsContainer.scrollLeft = 0;
                }
            }

            combinationsContainer.addEventListener('mouseenter', () => {
                clearInterval(scrollInterval);
            });

            combinationsContainer.addEventListener('mouseleave', () => {
                scrollInterval = setInterval(autoScroll, 30);
            });

            // Show Toastify
            const showToast = (title) => {
                Toastify({
                    text: title,
                    duration: 3000,
                    gravity: "bottom",
                    position: 'left',
                    backgroundColor: "#627211b6",
                    className: "info",
                    stopOnFocus: true
                }).showToast();
            };

            combinationsContainer.addEventListener('click', (event) => {
                const combinationItem = event.target.closest('.combination-item');
                const addToBasketBtn = event.target.closest('.add-to-basket-btn');

                if (addToBasketBtn && combinationItem) {
                    const title = combinationItem.querySelector('p:nth-of-type(1)').innerText;
                    const price = parseFloat(combinationItem.querySelector('p:nth-of-type(2)').innerText.replace('$', ''));
                    const imageFullPath = combinationItem.querySelector('img').getAttribute('src');

                    const image = imageFullPath.split('/assets/img/').pop();

                    const combinationData = {
                        title: title,
                        price: price,
                        image: `${image}`,
                        quantity: 1
                    };

                    const basket = JSON.parse(localStorage.getItem('basket')) || [];

                    const existingCombination = basket.find(item => item.title === title);
                    if (existingCombination) {
                        existingCombination.quantity += 1;
                    } else {
                        basket.push(combinationData);
                    }
                    localStorage.setItem('basket', JSON.stringify(basket));

                    // Show toast notification
                    showToast(`${title} added to basket.`);

                    updateCartCount();
                }
            });

            document.getElementById('add-to-basket').addEventListener('click', () => {
                const title = document.getElementById('flower-title').innerText;
                const price = parseFloat(document.getElementById('flower-price').innerText.replace('$', ''));
                const imageFullPath = document.querySelector('#flower-image img').getAttribute('src');

                const image = imageFullPath.split('/assets/img/').pop();

                // Save in localStorage
                const flowerData = {
                    title: title,
                    price: price,
                    image: `${image}`,
                    quantity: parseInt(document.getElementById('quantity').innerText)
                };

                // Create LocalStorage
                const basket = JSON.parse(localStorage.getItem('basket')) || [];

                // Check if already exists in the basket
                const existingFlower = basket.find(item => item.title === title);
                if (existingFlower) {
                    existingFlower.quantity += flowerData.quantity;
                } else {
                    basket.push(flowerData);
                }

                // Save to localStorage
                localStorage.setItem('basket', JSON.stringify(basket));

                // Show toast notification
                showToast(`${title} added to basket.`);

                updateCartCount();
            });

            // Quantity controls
            let quantity = 1;
            document.getElementById('quantity').innerText = quantity;

            document.getElementById('increase').addEventListener('click', () => {
                quantity++;
                document.getElementById('quantity').innerText = quantity;
            });

            document.getElementById('decrease').addEventListener('click', () => {
                if (quantity > 1) {
                    quantity--;
                    document.getElementById('quantity').innerText = quantity;
                }
            });
        }
    });

// Update cart counter
function updateCartCount() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const totalQuantity = basket.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.querySelector('#cart-count');
    cartCountElement.textContent = totalQuantity > 0 ? `${totalQuantity}` : '';
}

document.addEventListener('DOMContentLoaded', updateCartCount);