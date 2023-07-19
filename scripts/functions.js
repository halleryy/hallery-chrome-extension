// Choose random image from cached images in localStorage
const loadImageFromCache = () => {
    return JSON.parse(localStorage.getItem("hallery-cache-art"));
};

// Fetch images from the Hallery Art API
async function fetchImages(images=[]) {
    const apiUrl = "https://api.hallery.art/art/?limit=20"; // Fetch more images initially

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results.length > 0) {
            for (art in data.results){
                art = data.results[art]
                if (art.image.width > art.image.height) {
                    images.push(art)
                }
            }
            if (images.length >= 10) {
                console.log(JSON.stringify(images));

                // Save the images to localStorage as an array
                localStorage.setItem("hallery-cache-art", JSON.stringify(images));
                localStorage.setItem("hallery-cache-timestamp", Date.now());

                return images;
            } else {
                console.warn("Not enough images with width longer than height found. Fetching more images...");
                return fetchImages(images);
            }
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

// Function to check if the cached image is still valid (within a day)
const isCachedImageValid = () => {
    const cachedTimestamp = parseInt(localStorage.getItem("hallery-cache-timestamp"));
    if (!cachedTimestamp) return false;

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    return now - cachedTimestamp <= oneDay;
};

// Initialize clock
const startClock = () => {
    const clock = document.getElementById("clock-container");

    const updateClock = () => {
        const currentDate = new Date();
        const h = String(currentDate.getHours());
        const m = String(currentDate.getMinutes());

        clock.innerHTML = `${h.length === 1 ? `0${h}` : h}:${m.length === 1 ? `0${m}` : m}`;
    };

    updateClock();
    setInterval(updateClock, 1000);
};

const chooseRandomImageFromCache = () => {
    const cachedImages = JSON.parse(localStorage.getItem("hallery-cache-art"));
    if (!cachedImages || cachedImages.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * cachedImages.length);
    return cachedImages[randomIndex];
};
