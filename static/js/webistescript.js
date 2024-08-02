/**
 * Initializes and sets up event listeners for various functionalities.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Select elements for navigation links, gallery items, and arrows
    const navLinks = document.querySelectorAll('.nav-links a');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const leftArrow = document.querySelector('.gallery-arrow.left');
    const rightArrow = document.querySelector('.gallery-arrow.right');
    let currentIndex = 0; // Tracks the current index of the gallery item

    /**
     * Sets the active gallery item based on the current index.
     */
    const setActiveGalleryItem = () => {
        galleryItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    };

    // Event listener for the left arrow to show previous gallery item
    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        setActiveGalleryItem();
    });

    // Event listener for the right arrow to show next gallery item
    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        setActiveGalleryItem();
    });

    // Initial setup for gallery items
    setActiveGalleryItem();

    /**
     * Sets the active navigation link based on the current URL hash.
     */
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

    // Add event listeners to each link to update the active class on click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Set active link on page load based on the current URL hash
    setActiveLink();

    // Update active link when the hash changes
    window.addEventListener('hashchange', setActiveLink);
});

/**
 * Scrolls the gallery items container smoothly by a specified distance.
 * @param {number} distance - The distance to scroll, positive or negative.
 */
function scrollGallery(distance) {
    document.querySelector('.gallery-items-container').scrollBy({
        left: distance,
        behavior: 'smooth'
    });
}

// Event listeners for scrolling gallery items
document.getElementById('leftArrow').addEventListener('click', () => {
    scrollGallery(-300); // Scroll left by 300 pixels
});
document.getElementById('rightArrow').addEventListener('click', () => {
    scrollGallery(300); // Scroll right by 300 pixels
});

/**
 * Starts a countdown timer that updates the display element.
 * @param {number} duration - Duration of the timer in seconds.
 * @param {HTMLElement} display - The element where the timer is displayed.
 */
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
    // Initialize timers for auction countdowns
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

// Add to Cart functionality
let itemList = document.querySelector('.items');
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
        name: 'Sheep',
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

/**
 * Initializes item cards and adds them to the item list.
 */
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

/**
 * Adds an item to the cart based on its index.
 * @param {number} key - Index of the item in the items array.
 */
function addToCart(key) {
    if (cartLists[key] == null) {
        cartLists[key
