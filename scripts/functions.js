// Choose random item from given array
const choose = (choices) => {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
};

// Choose random image from cached images in localStorage
const randomImageFromCache = () => {
    const urls = JSON.parse(localStorage.getItem("hallery-cache-urls"));
    return choose(urls);
};

// Fetch 10 images from the Hallery Art API
const fetchImages = async () => {
    const apiUrl = "https://api.hallery.art/art/?limit=10";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results.length > 0) {
            const urls = data.results.map((art) => art.image.url);

            // Save the image URL and timestamp to localStorage
            localStorage.setItem("hallery-cache-urls", JSON.stringify(urls));
            localStorage.setItem("hallery-cache-timestamp", Date.now());
        }
    } catch (error) {
        console.error("Error fetching image:", error);
    }
};

// Fetch an image from the Hallery Art API
const fetchImage = async () => {
    const apiUrl = "https://api.hallery.art/art/?limit=1";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results.length > 0) {
            const url = data.results[0].image.url;

            // Save the image URL and timestamp to localStorage
            const cache = JSON.parse(localStorage.getItem("hallery-cache-urls"));

            cache.shift();
            cache.push(url);

            console.log(cache);

            localStorage.setItem("hallery-cache-urls", JSON.stringify(cache));

            return url;
        }
    } catch (error) {
        console.error("Error fetching image:", error);
    }
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
        const h = currentDate.getHours();
        const m = currentDate.getMinutes();
        const s = currentDate.getSeconds();
        clock.innerHTML = `${h}:${m}:${s}`;
    };

    updateClock();
    setInterval(updateClock, 1000);
};
