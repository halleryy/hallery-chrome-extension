(async () => {
    startClock();

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
