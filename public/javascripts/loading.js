function loadingPage() {
    const elementNeed = document.getElementById("content");
    const elementCreate = elementNeed.createElement("div");
    elementCreate.classList.toggle("loading");
}