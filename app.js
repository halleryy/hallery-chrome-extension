const choose = (choices) => {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
};

const randomImageFromCache = () => {
    const urls = JSON.parse(localStorage.getItem("hallery-cache-urls"));
    return choose(urls);
};

// Function to fetch an image from the Hallery Art API
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

(async () => {
    // Load a new image when the new tab is opened
    if (!isCachedImageValid()) {
        await fetchImages();
    }

    const imageContainer = document.getElementById("main-image");

    const url = randomImageFromCache();

    imageContainer.src = url;

    const refreshButton = document.getElementById("refresh-button");
    const svgIcon = document.getElementById("loading-icon");

    refreshButton.addEventListener("click", async () => {
        svgIcon.style.animationName = "spin";
        refreshButton.toggleAttribute("disabled");
        refreshButton.classList.toggle("button-disabled");

        const url = await fetchImage();
        imageContainer.src = url;

        imageContainer.onload = () => {
            svgIcon.style.animationName = "unset";
            refreshButton.toggleAttribute("disabled");
            refreshButton.classList.toggle("button-disabled");
        };
    });
})();
