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
