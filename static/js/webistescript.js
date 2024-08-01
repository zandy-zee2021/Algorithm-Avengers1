document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const leftArrow = document.querySelector('.gallery-arrow.left');
    const rightArrow = document.querySelector('.gallery-arrow.right');
    let currentIndex = 0;

    // Function to set the active gallery item based on the current index
    const setActiveGalleryItem = () => {
        galleryItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    };

    // Event listeners for gallery arrows
    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        setActiveGalleryItem();
    });

    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        setActiveGalleryItem();
    });

    // Initial setup for gallery items
    setActiveGalleryItem();

    // Function to set the active link based on the current hash
    const setActiveLink = () => {
        const currentHash = window.location.hash;
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentHash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // Add event listeners to each link to set the active class on click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Set active link on page load based on the current URL hash
    setActiveLink();

    // Update active link when the hash changes (e.g., when navigating through the page)
    window.addEventListener('hashchange', setActiveLink);
});

document.getElementById('leftArrow').addEventListener('click', () => {
    document.querySelector('.gallery-items-container').scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});

document.getElementById('rightArrow').addEventListener('click', () => {
    document.querySelector('.gallery-items-container').scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});

// auction times
function startAuctionTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    const duration = 5 * 60 * 60; // Timer duration in seconds (5 hours)
    const timer1 = document.querySelector('#timer1');
    const timer2 = document.querySelector('#timer2');
    const timer3 = document.querySelector('#timer3');
    const timer4 = document.querySelector('#timer4');

    startAuctionTimer(duration, timer1);
    startAuctionTimer(duration, timer2);
    startAuctionTimer(duration, timer3);
    startAuctionTimer(duration, timer4);
};

// add to cart
let itemList =  document.querySelector('.items');
let cart = document.querySelector('.cart');
let cartList = document.querySelector('.cart-list');
let total = document.querySelector('.total');
let tax = document.querySelector('.tax');
let subtotal = document.querySelector('.subtotal');

let items = [
    {
        id: 1,
        name: 'Goat',
        image: "{{ url_for('static', filename = 'Images/download-2.jpeg') }}",
        price: 2000
    },
    {
        id: 2,
        name: 'sheep',
        image: "{{ url_for('static', filename='Images/image4.png') }}" ,
        price: 1500
    },
    {
        id: 3,
        name: 'Lamb',
        image: "{{ url_for('static', filename='Images/image3.png') }}",
        price: 1200
    },
    {
        id: 4,
        name: 'Hen',
        image: "{{ url_for('static', filename='Images/image7.png') }}",
        price: 70
    },
    {
        id: 5,
        name: 'White Chicken',
        image: "{{ url_for('static', filename='Images/image6.png') }}" ,
        price: 70
    },
    {
        id: 6,
        name: 'Cow',
        image: "{{ url_for('static', filename='Images/image.png') }}",
        price: 11000
    },
    {
        id: 7,
        name: 'Calf',
        image: "{{ url_for('static', filename = 'Images/calf.jpeg') }}",
        price: 5000
    },
    {
        id: 8,
        name: 'Kid',
        image: "{{ url_for('static', filename = 'Images/babygoat.jpeg') }}",
        price: 1100
    },
    {
        id: 9,
        name: 'Chick',
        image: "{{ url_for('static', filename = 'Images/chick.jpeg') }}",
        price: 5000
    },
];

function initItem() {
    items.forEach((value, key) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('style', 'width: 15rem;');
        card.innerHTML = `
            <img src="${value.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title text-center">${value.name}</h4>
                <p class="card-text text-center">Price: ${value.price}</p>
                <button class="add-to-cart btn btn-dark form-control" onclick="addToCart(${key})">Add to Cart</button>
            </div>`;
        itemList.appendChild(card);
    });
}

initItem();

let cartLists = [];

function addToCart(key) {
    if (cartLists[key] == null) {
        cartLists[key] = JSON.parse(JSON.stringify(items[key]));
        cartLists[key].quantity = 1;
    }
    reloadCart();
}

function reloadCart() {
    cartList.innerHTML = '';
    let totalPrice = 0;
    cartLists.forEach((value, key) => {
        totalPrice = totalPrice + value.price;

        if (value != null) {
            let listItem = document.createElement('li');
            listItem.setAttribute('class', 'list-group-item');
            listItem.innerHTML = `
                <div><img src="${value.image}" style="width: 80px"/></div>
                <div><h5 class="mt-1">${value.name}</h5></div>
                <div><h6 class="mt-2">${value.price.toLocaleString()}</h6></div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count m-2">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            cartList.appendChild(listItem);
        }
    });

    // Calculate subtotal, tax, and total
    subtotal.innerText = totalPrice.toLocaleString();
    tax.innerText = (totalPrice * 0.12).toLocaleString(); // Assuming 12% tax
    total.innerText = (totalPrice + parseFloat(tax.innerText)).toLocaleString();
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete cartLists[key];
    } else {
        cartLists[key].quantity = quantity;
        cartLists[key].price = quantity * items[key].price;
    }
    reloadCart();
}

function clearCart() {
    cartLists = [];
    reloadCart();
}
