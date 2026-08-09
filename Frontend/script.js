let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');
const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
};
const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.removeItem('darkmode'); 
};
if (darkmode === 'active') enableDarkmode();
themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    const closeBtn = document.querySelector(".close");
    const photoContainer = document.querySelector(".pcontainer");
    photoContainer.addEventListener("click", function (event) {
        if (event.target.tagName === "IMG") {
            modal.style.display = "flex";
            const highQualityImage = event.target.dataset.full || event.target.src;
            modalImg.src = highQualityImage;
        }
    });
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
const gallery = document.querySelector(".pcontainer");
const loading = document.querySelector(".loading");
const searchForm = document.querySelector(".search-bar");
const searchInput = document.querySelector(".search-bar input");
const limitBanner = document.getElementById("limit-banner");
const limitBannerClose = document.getElementById("limit-banner-close");
function showLimitBanner() {
    limitBanner.classList.add("visible");
}
function hideLimitBanner() {
    limitBanner.classList.remove("visible");
}
limitBannerClose.addEventListener("click", hideLimitBanner);
const ACCESS_KEY = CONFIG.UNSPLASH_ACCESS_KEY;
let isFetching = false;
let searchResults = [];
let isSearchMode = false; 
let currentSearchPage = 1; 
const seenRandomIds = new Set(); 
async function fetchImages(query = "", page = 1, retryCount = 0) {
    if (isFetching) return;
    isFetching = true;
    loading.style.display = "block";
    try {
        let url;
        if (query) {
            url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${ACCESS_KEY}&per_page=12&page=${page}`;
        } else {
            url = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=6`;
        }
        const response = await fetch(url);
        if (response.status === 403) {
            showLimitBanner();
            throw new Error("Rate limit reached");
        }
        if (!response.ok) throw new Error("Failed to fetch images");
        hideLimitBanner(); 
        const data = await response.json();
        let images = query ? data.results : data;         
        if (query && page === 1) {
            gallery.innerHTML = "";
            searchResults = images; 
            isSearchMode = true;
            currentSearchPage = 1;
        } else if (query) {
            searchResults.push(...images);
            currentSearchPage = page;
        } else {
            const freshImages = images.filter(photo => !seenRandomIds.has(photo.id));
            freshImages.forEach(photo => seenRandomIds.add(photo.id));

            if (freshImages.length === 0 && retryCount < 3) {
                isFetching = false;
                loading.style.display = "none";
                return fetchImages(query, page, retryCount + 1);
            }
            images = freshImages;
        }
        displayImages(images);
        if (query && searchResults.length === 0) {
            isSearchMode = false;
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    } finally {
        loading.style.display = "none";
        isFetching = false;
    }
}