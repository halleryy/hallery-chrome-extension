(async () => {
    startClock();

    // Load a new image when the new tab is opened
    if (!isCachedImageValid()) {
        await fetchImage();
    }

    const imageContainer = document.getElementById("main-image");
    const linkContainer = document.getElementById("link");
    const titleContainer = document.getElementById("title");
    const artistContainer = document.getElementById("artist");

    const art = loadImageFromCache();
    imageContainer.src = art.image.url;
    imageContainer.onload = () => {
        linkContainer.setAttribute("href", `https://hallery.art/arts/${art.id}`);
        titleContainer.innerHTML = art.title;
        artistContainer.innerHTML = `${art.artist.name} | ${art.date}`;
    }

    const refreshButton = document.getElementById("refresh-button");
    const svgIcon = document.getElementById("loading-icon");

    refreshButton.addEventListener("click", async () => {
        svgIcon.style.animationName = "spin";
        refreshButton.toggleAttribute("disabled");
        refreshButton.classList.toggle("button-disabled");

        const art = await fetchImage();
        imageContainer.src = art.image.url;

        imageContainer.onload = () => {
            svgIcon.style.animationName = "unset";
            refreshButton.toggleAttribute("disabled");
            refreshButton.classList.toggle("button-disabled");
            linkContainer.setAttribute("href", `https://hallery.art/arts/${art.id}`);
            titleContainer.innerHTML = art.title;
            artistContainer.innerHTML = `${art.artist.name} | ${art.date}`;
        };
    });
})();
