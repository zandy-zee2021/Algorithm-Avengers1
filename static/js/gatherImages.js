/**
 * Gathers all image sources from the shop page and sends each image to a processing API.
 */
function gatherImages() {
    // Select all <img> elements with the class 'gallery-img' from the DOM
    const images = document.querySelectorAll('.gallery-img');

    // Create an array to store the 'src' attribute of each image
    const imageSrcList = [];

    // Iterate over the NodeList of images
    images.forEach(image => {
        // Push the 'src' attribute of each image into the imageSrcList array
        imageSrcList.push(image.src);
    });

    // Log the list of image sources for debugging purposes
    console.log(imageSrcList);

    // Optionally, process each image by sending it to the processing API
    imageSrcList.forEach(imageSrc => {
        // Fetch the image from the URL and process it
        fetch(imageSrc)
            .then(response => response.blob()) // Convert the response to a Blob object
            .then(blob => {
                // Create a URL for the Blob object to use as a file-like object
                const imagePath = URL.createObjectURL(blob);
                // Send the image path to the image processing API
                sendImageToProcessing(imagePath);
            })
            .catch(error => console.error('Error fetching image:', error)); // Log errors if the fetch fails
}

/**
 * Sends an image to the image processing API.
 *
 * @param {string} imagePath - The URL created from the Blob object representing the image.
 */
const sendImageToProcessing = async (imagePath) => {
    // Create a new FormData object to prepare the image for upload
    const form = new FormData();
    // Fetch the image from the imagePath and append it to the FormData object
    form.append('file', await fetch(imagePath).then(res => res.blob()), 'image.jpg');

    try {
        // Send a POST request with the FormData object to the image processing API
        const response = await axios.post('https://nerdma-b8ad4e234783.herokuapp.com/api/auction-analysis/', form, {
            headers: {
                ...form.getHeaders(), // Include the appropriate headers for the request
            },
        });
        // Log the result from the API response
        console.log('Result:', response.data.result);
    } catch (error) {
        // Log any errors that occur during the API request
        console.error('There was an error!', error);
    }
};

// Call the gatherImages function once the DOM content has fully loaded
document.addEventListener("DOMContentLoaded", () => {
    gatherImages();
});
