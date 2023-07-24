// Choose random image from cached images in localStorage
const loadImageFromCache = () => {
    return JSON.parse(localStorage.getItem("hallery-cache-art"));
};

// Fetch images from the Hallery Art API
async function fetchImages() {
    const apiUrl = "https://api.hallery.art/art/?limit=10"; // Fetch more images initially

    let images = [];

    const fetchFromApi = async () => {
        const response = await fetch(apiUrl);
        const data = await response.json();
        let arts = data.results;

        arts = arts.filter((art) => art.image.width > art.image.height);

        if (arts.length === 0) {
            await fetchFromApi();
        } else {
            preloadImages(arts);

            images = [...images, ...arts].slice(0, 20);
            localStorage.setItem("hallery-cache-art", JSON.stringify(images));
        }
    };

    const continueFetching = async () => {
        if (images.length < 20) {
            await fetchFromApi();
            continueFetching();
        }
    };

    try {
        localStorage.setItem("hallery-cache-timestamp", Date.now());

        await fetchFromApi();
        continueFetching();
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

const preloadImages = (arts) => {
    arts.forEach((art) => {
        const imageTag = document.createElement("img");
        imageTag.src = art.image.url;
        imageTag.onload = () => {
            console.log(art.id, "Image Loaded");
        };
    });
};

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
