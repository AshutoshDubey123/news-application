//const API_KEY = "94c7155ee1ed4..................."; 

//const BASE_URL = "https://gnews.io/api/v4/search?q=";

const PROXY_URL = "https://raspy-flower-acb3.hello-ashutosh-world.workers.dev";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

// async function fetchNews(query) {
//     try {
//         const res = await fetch(`${BASE_URL}${query}&token=${API_KEY}&lang=en`);
//         const data = await res.json();
//         bindData(data.articles);
//     } catch (error) {
//         console.error("Error fetching news:", error);
//     }
// }
async function fetchNews(query) {
    try {
        const res = await fetch(`${PROXY_URL}?q=${query}`);
        const data = await res.json();

        // GNews API returns `articles`
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.image) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.image;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description || "No description available.";

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value.trim();
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
