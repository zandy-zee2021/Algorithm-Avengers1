// Function to gather all image sources from the shop page
function gatherImages() {
    // Select all img elements within the image gallery
    const images = document.querySelectorAll('.gallery-img');

    // Create an array to store the src of each image
    const imageSrcList = [];

    // Iterate over the images and add their src to the array
    images.forEach(image => {
        imageSrcList.push(image.src);
    });

    // Log the list of image sources (for debugging)
    console.log(imageSrcList);

    // Optionally, send each image to the processing API
    imageSrcList.forEach(imageSrc => {
        // Fetch the image from the URL and process it
        fetch(imageSrc)
            .then(response => response.blob())
            .then(blob => {
                // Create a file-like object from the blob
                const imagePath = URL.createObjectURL(blob);
                sendImageToProcessing(imagePath);
            })
            .catch(error => console.error('Error fetching image:', error));
}

// Function to send an image to the image processing API
const sendImageToProcessing = async (imagePath) => {
    const form = new FormData();
    form.append('file', await fetch(imagePath).then(res => res.blob()), 'image.jpg');

    try {
        const response = await axios.post('http://localhost:8000/api/image-processing/', form, {
            headers: {
                ...form.getHeaders(),
            },
        });
        console.log('Result:', response.data.result);
    } catch (error) {
        console.error('There was an error!', error);
    }
};

// Call the function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    gatherImages();
});
