// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add item to cart and update localStorage
function addToCart(item, price) {
    cart.push({ item, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${item} has been added to your cart!`);
}

// Load cart items
function loadCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    let totalPrice = 0;

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach((product, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${product.item} - $${product.price.toFixed(2)}
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItems.appendChild(li);
            totalPrice += product.price;
        });
    }

    totalPriceEl.textContent = totalPrice.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Order placed successfully! 🎉');
    localStorage.removeItem('cart');
    cart = [];
    loadCart();
    updateCartCount();
}

// Update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Load cart on page load
window.onload = () => {
    loadCart();
    updateCartCount();
};
