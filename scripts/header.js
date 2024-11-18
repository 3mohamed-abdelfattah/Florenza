const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Toggle Burger button
burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});