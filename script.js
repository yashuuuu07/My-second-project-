// script.js

document.addEventListener('DOMContentLoaded', () => {

    /*-----------------------------------------------------------------------------------
        1. Product Data (Array of 20 Indian electronics products)
    -----------------------------------------------------------------------------------*/

    const products = [
        { id: 1, name: 'Samsung Galaxy S24 Ultra', category: 'Smartphones', price: 129999, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=Samsung+S24' },
        { id: 2, name: 'OnePlus 12R', category: 'Smartphones', price: 49999, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=OnePlus+12R' },
        { id: 3, name: 'Xiaomi Redmi Note 13 Pro Max', category: 'Smartphones', price: 28999, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=Redmi+Note+13' },
        { id: 4, name: 'Dell XPS 15 Laptop', category: 'Laptops', price: 145000, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=Dell+XPS+15' },
        { id: 5, name: 'HP Spectre x360', category: 'Laptops', price: 119000, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=HP+Spectre' },
        { id: 6, name: 'Lenovo Legion 5 Gaming Laptop', category: 'Laptops', price: 95000, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=Lenovo+Legion' },
        { id: 7, name: 'Sony WH-1000XM5 Headphones', category: 'Audio', price: 29990, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=Sony+XM5' },
        { id: 8, name: 'JBL Flip 6 Portable Speaker', category: 'Audio', price: 7999, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=JBL+Flip+6' },
        { id: 9, name: 'Apple iPad Air (5th Gen)', category: 'Tablets', price: 59900, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=iPad+Air' },
        { id: 10, name: 'Samsung Galaxy Tab S9', category: 'Tablets', price: 65000, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=Galaxy+Tab' },
        { id: 11, name: 'Logitech G502 Hero Gaming Mouse', category: 'Gaming Accessories', price: 4500, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=Gaming+Mouse' },
        { id: 12, name: 'HyperX Cloud Stinger Core Headset', category: 'Gaming Accessories', price: 2999, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=Gaming+Headset' },
        { id: 13, name: 'Apple Watch Series 9', category: 'Smartwatches', price: 41900, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=Apple+Watch' },
        { id: 14, name: 'Samsung Galaxy Watch 6 Classic', category: 'Smartwatches', price: 36999, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=Galaxy+Watch' },
        { id: 15, name: 'GoPro HERO12 Black', category: 'Cameras', price: 44999, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=GoPro+Hero12' },
        { id: 16, name: 'Canon EOS 200D II DSLR', category: 'Cameras', price: 58000, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=Canon+DSLR' },
        { id: 17, name: 'Amazon Echo Dot (5th Gen)', category: 'Smart Home', price: 5499, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=Echo+Dot' },
        { id: 18, name: 'Philips Hue Smart Bulb', category: 'Smart Home', price: 1800, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=Smart+Bulb' },
        { id: 19, name: 'Boat Airdopes 141 TWS Earbuds', category: 'Audio', price: 1499, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=Boat+Airdopes' },
        { id: 20, name: 'SanDisk Extreme Portable SSD 1TB', category: 'Storage', price: 9999, imageUrl: 'https://via.placeholder.com/400x300/e9ecef/212529?text=Portable+SSD' }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    /*-----------------------------------------------------------------------------------
        2. Core Features - DOM Elements and Event Listeners
    -----------------------------------------------------------------------------------*/

    const mainContent = document.getElementById('main-content');
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .btn[href^="#"]');
    const searchInput = document.querySelector('.navbar .form-control[type="search"]');
    const searchForm = document.querySelector('.navbar .d-flex.me-3');
    const cartBadge = document.querySelector('.navbar .badge');
    const productsGrid = document.querySelector('#products .row.row-cols-1'); // Adjusted selector for the main product grid
    const cartItemsContainer = document.querySelector('#cart .col-lg-8 .card-body');
    const cartSubtotalSpan = document.querySelector('#cart .list-group-item:nth-child(1) span');
    const cartTotalSpan = document.querySelector('#cart .list-group-item.fw-bold span');
    const checkoutForm = document.querySelector('#checkout form');
    const orderIdDisplay = document.querySelector('#order-confirmation .lead');
    const priceRangeInput = document.getElementById('priceRange');
    const productFilters = document.querySelectorAll('#products aside input[type="checkbox"]');


    // Initial setup
    renderCart();
    handlePageRouting(); // Initial routing based on URL hash
    renderProducts(products); // Render all products initially

    // Event Listeners for Page Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            history.pushState(null, null, '#' + targetId);
            // Scroll to top when navigating to a new section
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('hashchange', handlePageRouting);

    // Search functionality
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        searchProducts(searchInput.value);
        showSection('products'); // Show products page after search
        history.pushState(null, null, '#products');
    });

    // Filter functionality
    productFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    priceRangeInput.addEventListener('input', applyFilters); // Trigger filter on range change
    document.querySelector('#products aside .btn-primary').addEventListener('click', applyFilters);


    // Checkout Form Submission
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm('checkout-form')) { // Assuming checkoutForm's parent has ID 'checkout-form' for simplicity
            processCheckout();
        } else {
            alert('Please correct the errors in the form.');
        }
    });

    /*-----------------------------------------------------------------------------------
        3. Specific Functions Needed
    -----------------------------------------------------------------------------------*/

    /**
     * Formats a price into Indian Rupees (₹X,XX,XXX).
     * @param {number} price - The price to format.
     * @returns {string} The formatted price string.
     */
    function formatPrice(price) {
        if (typeof price !== 'number' || isNaN(price)) {
            return 'Invalid Price';
        }
        // Using toLocaleString with 'en-IN' locale for Indian numbering format
        return `₹${price.toLocaleString('en-IN')}`;
    }

    /**
     * Renders products to the product grid.
     * @param {Array<Object>} productList - The array of products to display.
     */
    function renderProducts(productList) {
        if (!productsGrid) {
            console.error("Products grid container not found.");
            return;
        }

        productsGrid.innerHTML = ''; // Clear existing products
        if (productList.length === 0) {
            productsGrid.innerHTML = '<p class="text-center col-12">No products found matching your criteria.</p>';
            return;
        }

        productList.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'col';
            productCard.innerHTML = `
                <div class="card h-100 shadow-sm product-card">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-muted">${product.category}</p>
                        <div class="rating-stars">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                        </div>
                        <p class="card-text fw-bold">${formatPrice(product.price)}</p>
                        <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                addToCart(productId);
                alert(`${products.find(p => p.id === productId).name} added to cart!`);
            });
        });
    }

    /**
     * Adds a product to the cart or increments its quantity.
     * @param {number} productId - The ID of the product to add.
     */
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) {
            console.error('Product not found:', productId);
            return;
        }

        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart();
        renderCart();
    }

    /**
     * Removes a product from the cart.
     * @param {number} productId - The ID of the product to remove.
     */
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        renderCart();
        alert('Item removed from cart.');
    }

    /**
     * Updates the quantity of a product in the cart.
     * @param {number} productId - The ID of the product to update.
     * @param {number} quantity - The new quantity.
     */
    function updateQuantity(productId, quantity) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity = parseInt(quantity);
            if (cartItem.quantity <= 0) {
                removeFromCart(productId);
            } else {
                saveCart();
                renderCart();
            }
        }
    }

    /**
     * Renders the current state of the shopping cart.
     */
    function renderCart() {
        if (!cartItemsContainer || !cartBadge || !cartSubtotalSpan || !cartTotalSpan) {
            console.error("Cart DOM elements not found.");
            return;
        }

        cartItemsContainer.innerHTML = '';
        let totalItems = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                totalItems += item.quantity;
                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'row align-items-center mb-3';
                cartItemDiv.innerHTML = `
                    <div class="col-md-2">
                        <img src="${item.imageUrl}" class="img-fluid rounded" alt="${item.name}">
                    </div>
                    <div class="col-md-5">
                        <h5 class="mb-0">${item.name}</h5>
                        <div class="d-flex align-items-center mt-2">
                            <label for="quantity-${item.id}" class="visually-hidden">Quantity</label>
                            <input type="number" id="quantity-${item.id}" class="form-control form-control-sm me-2 quantity-input" style="width: 70px;" value="${item.quantity}" min="1" data-product-id="${item.id}">
                        </div>
                    </div>
                    <div class="col-md-3 text-end">
                        <p class="fw-bold mb-0">${formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <div class="col-md-2 text-end">
                        <button class="btn btn-danger btn-sm remove-from-cart-btn" data-product-id="${item.id}"><i class="fas fa-trash"></i></button>
                    </div>
                    <hr class="mt-3">
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }

        // Add event listeners for quantity changes and removal
        cartItemsContainer.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                updateQuantity(productId, e.target.value);
            });
        });

        cartItemsContainer.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                removeFromCart(productId);
            });
        });

        // Update totals
        cartBadge.textContent = totalItems;
        const { subtotal, shipping, total } = calculateTotal();
        cartSubtotalSpan.textContent = formatPrice(subtotal);
        cartTotalSpan.textContent = formatPrice(total);
    }

    /**
     * Calculates the subtotal, shipping, and total for the cart.
     * @returns {Object} An object containing subtotal, shipping, and total.
     */
    function calculateTotal() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 0; // Free shipping for simplicity
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    /**
     * Saves the current cart to local storage.
     */
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    /**
     * Filters products based on a search query.
     * @param {string} query - The search string.
     */
    function searchProducts(query) {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(lowerCaseQuery) ||
            product.category.toLowerCase().includes(lowerCaseQuery)
        );
        renderProducts(filtered);
    }

    /**
     * Applies filters from the sidebar to the product list.
     */
    function applyFilters() {
        let filteredProducts = [...products]; // Start with all products

        // Category filter
        const selectedCategories = Array.from(document.querySelectorAll('#products aside input[type="checkbox"]:checked'))
                                        .map(cb => cb.id.replace('filter', ''));

        if (selectedCategories.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedCategories.includes(product.category.replace(/\s/g, '')) // Remove spaces for comparison
            );
        }

        // Price range filter
        const maxPrice = parseInt(priceRangeInput.value);
        if (!isNaN(maxPrice)) {
            filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
        }

        renderProducts(filteredProducts);
    }


    /**
     * Validates a form based on its ID.
     * @param {string} formId - The ID of the form element.
     * @returns {boolean} True if the form is valid, false otherwise.
     */
    function validateForm(formId) {
        const form = document.querySelector(`#${formId} form`) || document.getElementById(formId);
        if (!form) {
            console.error('Form not found:', formId);
            return false;
        }

        let isValid = true;
        const requiredInputs = form.querySelectorAll('[required]');

        requiredInputs.forEach(input => {
            input.classList.remove('is-invalid', 'is-valid'); // Clear previous states

            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else if (input.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value)) {
                input.classList.add('is-invalid');
                isValid = false;
            } else if (input.type === 'tel' && !/^[0-9]{10}$/.test(input.value)) { // Simple 10-digit phone validation
                input.classList.add('is-invalid');
                isValid = false;
            }
            // Add more specific validations as needed (e.g., credit card regex, CVV length)
            else {
                input.classList.add('is-valid');
            }
        });

        // Specific validation for payment methods (at least one must be selected)
        const paymentMethods = form.querySelectorAll('input[name="paymentMethod"]');
        let paymentSelected = false;
        paymentMethods.forEach(radio => {
            if (radio.checked) {
                paymentSelected = true;
            }
        });
        if (!paymentSelected) {
            isValid = false;
            alert('Please select a payment method.'); // Provide user feedback
        }

        return isValid;
    }

    /**
     * Handles the checkout process (simulated).
     */
    function processCheckout() {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add products before checking out.');
            return;
        }

        // Simulate API call or order submission
        console.log('Processing checkout with cart:', cart);
        console.log('Customer Details:', {
            firstName: document.getElementById('firstName').value,
            email: document.getElementById('email').value,
            // ... more form data
        });

        const orderId = generateOrderId();
        orderIdDisplay.innerHTML = `Your order <strong>#${orderId}</strong> has been successfully placed.`;

        // Clear cart and update UI
        cart = [];
        saveCart();
        renderCart();

        // Navigate to order confirmation page
        showSection('order-confirmation');
        history.pushState(null, null, '#order-confirmation');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Generates a fake order ID.
     * @returns {string} A fake order ID.
     */
    function generateOrderId() {
        const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `EM-${timestamp}-${randomNum}`;
    }


    /*-----------------------------------------------------------------------------------
        4. Page Management
    -----------------------------------------------------------------------------------*/

    /**
     * Shows a specific section and hides all others.
     * Applies a fade-in animation.
     * @param {string} id - The ID of the section to show.
     */
    function showSection(id) {
        sections.forEach(section => {
            if (section.id === id) {
                section.classList.remove('d-none');
                section.classList.add('fade-in'); // Apply fade-in animation
            } else {
                section.classList.add('d-none');
                section.classList.remove('fade-in'); // Remove animation class if not current
            }
        });

        // Update active class for navigation links
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update breadcrumbs (simple example)
        // You would typically have a dedicated breadcrumb element
        const breadcrumbContainer = document.querySelector('.breadcrumb'); // Assuming you have one
        if (breadcrumbContainer) {
            breadcrumbContainer.innerHTML = `
                <li class="breadcrumb-item"><a href="#home">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">${id.charAt(0).toUpperCase() + id.slice(1).replace('-', ' ')}</li>
            `;
        }
    }

    /**
     * Handles initial page routing based on URL hash.
     */
    function handlePageRouting() {
        const initialHash = window.location.hash.substring(1) || 'home';
        showSection(initialHash);
        // Special case: If navigating directly to products, render them
        if (initialHash === 'products') {
            renderProducts(products);
        }
    }


    /*-----------------------------------------------------------------------------------
        5. Indian E-commerce Features (Additional Enhancements)
    -----------------------------------------------------------------------------------*/

    // Populate Indian States and Cities (Example)
    const stateSelect = document.getElementById('state');
    const indiaStates = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];

    if (stateSelect) {
        indiaStates.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }

    // You could extend this to dynamically load cities based on selected state if needed
    // e.g., using a JSON file or API for city data.

    // Payment methods already included as radio buttons in HTML
    // UPI / NetBanking / COD can be easily integrated via radio buttons.

});