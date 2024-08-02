// Declare variables only once
let listProductHTML = document.querySelector('.listProduct'); // Container for product list
let listCartHTML = document.querySelector('.listCart'); // Container for cart items
let iconCart = document.querySelector('.icon-cart'); // Cart icon
let iconCartSpan = document.querySelector('.icon-cart span'); // Span inside cart icon for quantity display
let body = document.querySelector('body'); // Body element for toggling cart visibility
let closeCart = document.querySelector('.close'); // Button to close the cart
let checkOutButton = document.querySelector('.checkOut'); // Button to proceed to checkout
let totalPriceElement = document.querySelector('.totalPrice'); // Element to display total price
let products = []; // Array to hold product data
let cart = []; // Array to hold cart data

/**
 * Toggles the visibility of the cart by adding/removing a class on the body element.
 */
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart'); // Show or hide the cart by toggling class on body
});

/**
 * Closes the cart by removing the class that shows it.
 */
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart'); // Hide the cart by toggling class on body
});

/**
 * Adds product data to the HTML product list container.
 */
const addDataToHTML = () => {
    listProductHTML.innerHTML = ''; // Clear existing product list
    if (products.length > 0) { // Check if there are products to display
        products.forEach(product => {
            let newProduct = document.createElement('div'); // Create a new product element
            newProduct.dataset.id = product.id; // Set product ID in data attribute
            newProduct.classList.add('item'); // Add class for styling
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">R${product.price}</div>
                <button class="addCart">Add To Cart</button>`; // Product details and add-to-cart button
            listProductHTML.appendChild(newProduct); // Append new product to the product list
        });
    }
};

/**
 * Handles click events on the product list and adds selected products to the cart.
 * @param {Event} event - The click event.
 */
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target; // Get the clicked element
    if (positionClick.classList.contains('addCart')) { // Check if it's the add-to-cart button
        let id_product = positionClick.parentElement.dataset.id; // Get product ID
        addToCart(id_product); // Add product to cart
    }
});

/**
 * Adds a product to the cart or updates its quantity if it's already in the cart.
 * @param {string} product_id - The ID of the product to be added to the cart.
 */
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id); // Find product in cart
    if (cart.length <= 0) { // If cart is empty
        cart = [{
            product_id: product_id,
            quantity: 1 // Add new product with quantity 1
        }];
    } else if (positionThisProductInCart < 0) { // If product is not in cart
        cart.push({
            product_id: product_id,
            quantity: 1 // Add new product with quantity 1
        });
    } else {
        cart[positionThisProductInCart].quantity += 1; // Increase quantity if product is already in cart
    }
    addCartToHTML(); // Update cart display
    addCartToMemory(); // Save cart to localStorage
};

/**
 * Saves the current state of the cart to localStorage.
 */
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart as JSON string
};

/**
 * Calculates the total price of the items in the cart.
 * @returns {number} - The total price of all cart items.
 */
const calculateTotalPrice = () => {
    let totalPrice = 0; // Initialize total price
    cart.forEach(item => {
        let positionProduct = products.findIndex((value) => value.id == item.product_id); // Find product info
        if (positionProduct !== -1) { // If product is found
            let info = products[positionProduct];
            totalPrice += info.price * item.quantity; // Calculate total price
        }
    });
    console.log('Calculated Total Price:', totalPrice); // Debug log
    return totalPrice; // Return total price
};

/**
 * Updates the displayed total price in the HTML.
 */
const updateTotalPriceInHTML = () => {
    let totalPrice = calculateTotalPrice(); // Calculate total price
    totalPriceElement.innerText = `Total: R${totalPrice.toFixed(2)}`; // Display total price
};

/**
 * Updates the cart display with current cart items.
 */
const addCartToHTML = () => {
    listCartHTML.innerHTML = ''; // Clear existing cart items
    let totalQuantity = 0; // Initialize total quantity
    if (cart.length > 0) { // Check if there are items in the cart
        cart.forEach(item => {
            totalQuantity += item.quantity; // Update total quantity
            let newItem = document.createElement('div'); // Create new cart item element
            newItem.classList.add('item'); // Add class for styling
            newItem.dataset.id = item.product_id; // Set product ID in data attribute

            let positionProduct = products.findIndex((value) => value.id == item.product_id); // Find product info
            if (positionProduct !== -1) { // If product is found
                let info = products[positionProduct];
                newItem.innerHTML = `
                    <div class="image">
                        <img src="${info.image}">
                    </div>
                    <div class="name">
                        ${info.name}
                    </div>
                    <div class="totalPrice">R${info.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus"><</span>
                        <span>${item.quantity}</span>
                        <span class="plus">></span>
                    </div>
                `; // Display product details and quantity controls
            } else {
                console.error(`Product with ID ${item.product_id} not found in products array.`); // Log error if product is not found
            }

            listCartHTML.appendChild(newItem); // Append new item to cart list
        });
    }
    iconCartSpan.innerText = totalQuantity; // Update cart icon quantity display
    updateTotalPriceInHTML(); // Update total price whenever the cart is updated
};

/**
 * Handles click events on the cart for adjusting item quantities.
 * @param {Event} event - The click event.
 */
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target; // Get the clicked element
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) { // Check if it's a quantity control
        let product_id = positionClick.parentElement.parentElement.dataset.id; // Get product ID
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus'; // Determine type of adjustment
        changeQuantityCart(product_id, type); // Adjust quantity
    }
});

/**
 * Changes the quantity of an item in the cart or removes it if quantity is zero.
 * @param {string} product_id - The ID of the product to adjust.
 * @param {string} type - The type of adjustment ('plus' or 'minus').
 */
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id); // Find item in cart
    if (positionItemInCart >= 0) { // If item is found
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity += 1; // Increase quantity
                break;
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1; // Decrease quantity
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity; // Update quantity
                } else {
                    cart.splice(positionItemInCart, 1); // Remove item if quantity is 0
                }
                break;
        }
    }
    addCartToHTML(); // Update cart display
    addCartToMemory(); // Save updated cart to localStorage
};

/**
 * Handles click events on the checkout button.
 */
checkOutButton.addEventListener('click', () => {
    if (cart.length > 0) { // Check if cart is not empty
        alert('Proceeding to checkout...'); // Alert user
        // Implement checkout logic here
    } else {
        alert('Your cart is empty.'); // Alert user if cart is empty
    }
});

/**
 * Initializes the app by loading product data and cart state.
 */
const initApp = () => {
    fetch('products.json') // Fetch product data from JSON file
        .then(response => response.json()) // Parse JSON response
        .then(data => {
            products = data; // Assign fetched data to products array
            addDataToHTML(); // Add products to HTML
            if (localStorage.getItem('cart')) { // Check if there is saved cart in localStorage
                cart = JSON.parse(localStorage.getItem('cart')); // Retrieve and parse cart data
                addCartToHTML(); // Add saved cart items to HTML
            }
        })
        .catch(error => console.error('Error fetching products:', error)); // Handle fetch error
};

// Call initApp to start the application
initApp();
