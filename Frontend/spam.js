document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const cartItems = document.getElementById('cart-items');
    const cartIcon = document.querySelector('.cart');
    const clearCartButton = document.getElementById('clear-cart');
    let cart = [];

    if (!cartCount || !cartItemsContainer || !cartItems || !cartIcon || !clearCartButton) {
        console.error('Some required elements are missing in the DOM.');
        return;
    }

    cartIcon.addEventListener('click', () => {
        cartItemsContainer.classList.toggle('active');
    });

    const addToCart = (productId, productName, productPrice) => {
        const productExists = cart.find(item => item.id === productId);
        if (!productExists) {
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            };
            cart.push(product);
        } else {
            productExists.quantity += 1;
        }
        updateCartCount();
        displayCartItems();
        cartItemsContainer.classList.add('active'); // Show cart when adding an item
    };

    const updateCartCount = () => {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    };

    const displayCartItems = () => {
        cartItems.innerHTML = ''; // Clear previous items
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>No items in the cart.</p>';
            return;
        }
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)} (x${item.quantity})</p>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });
        handleRemoveButtons();
    };

    const handleRemoveButtons = () => {
        const removeButtons = document.querySelectorAll('.remove-from-cart');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    };

    const removeFromCart = (productId) => {
        cart = cart.filter(item => item.id !== productId);
        updateCartCount();
        displayCartItems();
    };

    clearCartButton.addEventListener('click', () => {
        cart = [];
        updateCartCount();
        displayCartItems();
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product');
            if (!product) {
                console.error('Product element not found.');
                return;
            }
            const productId = parseInt(product.getAttribute('data-id'));
            const productName = product.querySelector('h3').textContent;
            const productPrice = parseFloat(product.querySelector('p').textContent.replace('$', ''));
            addToCart(productId, productName, productPrice);
        });
    });
});