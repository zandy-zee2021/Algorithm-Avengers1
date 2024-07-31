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

{/* <form id="search-form" enctype="multipart/form-data">
    <input type="file" id="image-upload" name="image" accept="image/*">
    <button type="submit">Search</button>
</form>
<div id="results"></div>
<script>
    document.getElementById('search-form').onsubmit = async function(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', document.getElementById('image-upload').files[0]);

        const response = await fetch('/search', {
            method: 'POST',
            body: formData
        });
        const results = await response.json();
        document.getElementById('results').innerText = JSON.stringify(results, null, 2);
    };
</script> */}

