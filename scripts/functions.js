// Choose random image from cached images in localStorage
const loadImageFromCache = () => {
    return JSON.parse(localStorage.getItem("hallery-cache-art"));
};

// Fetch an image from the Hallery Art API
const fetchImage = async () => {
    const apiUrl = "https://api.hallery.art/art/?limit=1";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results.length > 0) {
            const art = data.results[0];

            localStorage.setItem("hallery-cache-art", JSON.stringify(art));
            localStorage.setItem("hallery-cache-timestamp", Date.now());

            return art;
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
        const h = String(currentDate.getHours());
        const m = String(currentDate.getMinutes());

        clock.innerHTML = `${h.length === 1 ? `0${h}` : h}:${m.length === 1 ? `0${m}` : m}`;
    };

    updateClock();
    setInterval(updateClock, 1000);
};
