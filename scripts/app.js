(async () => {
    startClock();

    // Load a new image when the new tab is opened
    if (!isCachedImageValid()) {
        await fetchImages();
    }

  const chosenArt = chooseRandomImageFromCache();
  if (chosenArt) {
    const imageContainer = document.getElementById("main-image");
    const linkContainer = document.getElementById("link");
    const titleContainer = document.getElementById("title");
    const artistContainer = document.getElementById("artist");

    imageContainer.src = chosenArt.image.url;
    imageContainer.onload = () => {
      linkContainer.setAttribute("href", `https://hallery.art/arts/${chosenArt.id}`);
      titleContainer.innerHTML = chosenArt.title;
      artistContainer.innerHTML = `${chosenArt.artist.name} | ${chosenArt.date}`;
    };
  }

  const refreshButton = document.getElementById("refresh-button");
  const svgIcon = document.getElementById("loading-icon");

  refreshButton.addEventListener("click", async () => {
    svgIcon.style.animationName = "spin";
    refreshButton.toggleAttribute("disabled");
    refreshButton.classList.toggle("button-disabled");

    // Fetch new images and get a random one
    const images = await fetchImages();
    const chosenArt = chooseRandomImageFromCache();

    if (chosenArt) {
      const imageContainer = document.getElementById("main-image");
      const linkContainer = document.getElementById("link");
      const titleContainer = document.getElementById("title");
      const artistContainer = document.getElementById("artist");

      imageContainer.src = chosenArt.image.url;
      imageContainer.onload = () => {
        svgIcon.style.animationName = "unset";
        refreshButton.toggleAttribute("disabled");
        refreshButton.classList.toggle("button-disabled");
        linkContainer.setAttribute("href", `https://hallery.art/arts/${chosenArt.id}`);
        titleContainer.innerHTML = chosenArt.title;
        artistContainer.innerHTML = `${chosenArt.artist.name} | ${chosenArt.date}`;
      };
    }
  });
})();
