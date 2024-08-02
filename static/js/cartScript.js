// // For shop page
// document.addEventListener('DOMContentLoaded', () => {
//     let listProductHTML = document.querySelector('.gallery-items-container');
//     let iconCart = document.querySelector('.cart-icon');
//     let body = document.querySelector('body');
//     let closeCart = document.querySelector('.close');
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     // Show/hide cart
//     iconCart.addEventListener('click', () => {
//         body.classList.toggle('showCart');
//     });

//     closeCart.addEventListener('click', () => {
//         body.classList.toggle('showCart');
//     });

//     // Add event listeners to all add-to-cart buttons
//     listProductHTML.addEventListener('click', (event) => {
//         if (event.target.classList.contains('add-to-cart')) {
//             let productId = event.target.closest('.gallery-item').dataset.id;
//             addToCart(productId);
//         }
//     });

//     const addToCart = (productId) => {
//         let item = cart.find(item => item.product_id === productId);
//         if (item) {
//             item.quantity += 1;
//         } else {
//             cart.push({ product_id: productId, quantity: 1 });
//         }
//         addCartToMemory();
//         showNotification('Item added to cart');
//         window.location.href = '/addToCart'; // Redirect to the cart page
//     };

//     const addCartToMemory = () => {
//         localStorage.setItem('cart', JSON.stringify(cart));
//     };

//     const showNotification = (message) => {
//         let notification = document.createElement('div');
//         notification.className = 'notification';
//         notification.innerText = message;
//         document.body.appendChild(notification);
//         setTimeout(() => {
//             notification.remove();
//         }, 3000); // Remove notification after 3 seconds
//     };
// });


// // For cart page
// // cartScript.js
// document.addEventListener('DOMContentLoaded', () => {
//     const listCartHTML = document.querySelector('.cart-list');
//     const subtotalHTML = document.querySelector('.subtotal');
//     const taxHTML = document.querySelector('.tax');
//     const totalHTML = document.querySelector('.total');
//     const clearButton = document.querySelector('.clear');

//     let cart = []; // This should be loaded from somewhere, e.g., local storage or an API

//     const addCartToHTML = () => {
//         if (listCartHTML) {
//             listCartHTML.innerHTML = '';
//             let subtotal = 0;
//             cart.forEach(item => {
//                 // Example item structure: { product_id: 'product1', quantity: 2 }
//                 let product = products.find(p => p.id == item.product_id);
//                 if (product) {
//                     let totalPrice = product.price * item.quantity;
//                     subtotal += totalPrice;
//                     let newItem = document.createElement('li');
//                     newItem.classList.add('list-group-item');
//                     newItem.innerHTML = `
//                         <div class="d-flex justify-content-between">
//                             <div>${product.name}</div>
//                             <div>R${totalPrice.toFixed(2)} (${item.quantity})</div>
//                         </div>`;
//                     listCartHTML.appendChild(newItem);
//                 }
//             });
//             updateTotals(subtotal);
//         }
//     };

//     const updateTotals = (subtotal) => {
//         const tax = subtotal * 0.12;
//         const total = subtotal + tax;
//         subtotalHTML.textContent = subtotal.toFixed(2);
//         taxHTML.textContent = tax.toFixed(2);
//         totalHTML.textContent = total.toFixed(2);
//     };

//     clearButton.addEventListener('click', () => {
//         cart = []; // Clear the cart array
//         addCartToHTML(); // Update the cart display
//     });

//     addCartToHTML(); // Initial load of cart
// });


