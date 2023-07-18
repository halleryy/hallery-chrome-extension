// Function to fetch an image from the Hallery Art API
async function fetchImage() {
    const apiUrl = "https://api.hallery.art/art/?limit=1";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results.length > 0 && data.results[0].image && data.results[0].image.url) {
            const imageUrl = data.results[0].image.url;
            const imageTimestamp = Date.now();

            // Save the image URL and timestamp to localStorage
            localStorage.setItem("cachedImageURL", imageUrl);
            localStorage.setItem("cachedImageTimestamp", imageTimestamp);

            const imageContainer = document.getElementById("main-image");
            imageContainer.src = imageUrl;
        }
    } catch (error) {
        console.error("Error fetching image:", error);
    }
    const refreshButton = document.getElementById("refresh-button");
    refreshButton.addEventListener("click", () => {
        fetchImage(); // Refresh the image when the button is clicked
    });
}

// Function to check if the cached image is still valid (within a day)
function isCachedImageValid() {
    const cachedTimestamp = parseInt(localStorage.getItem("cachedImageTimestamp"));
    if (!cachedTimestamp) return false;

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    return now - cachedTimestamp <= oneDay;
}

// Load a new image when the new tab is opened
if (isCachedImageValid()) {
    const cachedImageUrl = localStorage.getItem("cachedImageURL");
    const imageContainer = document.getElementById("main-image");
    imageContainer.src = cachedImageUrl;
    const refreshButton = document.getElementById("refresh-button");
    refreshButton.addEventListener("click", () => {
        fetchImage(); // Refresh the image when the button is clicked
    });
} else {
    fetchImage();
}
  