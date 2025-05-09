const API_KEY = "fab328e384msh921008f1a65af16p1061ebjsne15bd95c0462";
const API_HOST = "deezerdevs-deezer.p.rapidapi.com";

const params = new URLSearchParams(window.location.search);
const artistQuery = params.get("artist");

const fetchArtistData = async (query) => {
  const response = await fetch(`https://${API_HOST}/search?q=${query}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_HOST,
    },
  });

  if (!response.ok) throw new Error("Errore API");
  const data = await response.json();
  return data.data;
};

window.addEventListener("DOMContentLoaded", async () => {
  if (!artistQuery) {
    console.error("Parametro 'artist' mancante nell'URL");
    return;
  }

  try {
    const results = await fetchArtistData(artistQuery);
    if (results.length === 0) return;

    const artist = results[0].artist;

    // 🔁 Aggiorna background header
    const header = document.querySelector(".artist-header");
    if (header) {
      header.style.backgroundImage = `url('${artist.picture_xl}')`;
      header.style.backgroundSize = "cover";
      header.style.backgroundPosition = "center";
    }

    // 🔁 Aggiorna nome artista
    const nameEl = document.querySelector(".artist-info h1");
    if (nameEl) nameEl.textContent = artist.name;

    // 🔁 Aggiorna ascoltatori mensili
    const listenersEl = document.querySelector(".artist-info p");
    if (listenersEl) listenersEl.textContent = `${Math.floor(Math.random() * 5_000_000)} ascoltatori mensili`;

    // 🔁 Popola brani popolari
    const trackList = document.querySelector(".list-unstyled");
    if (trackList) {
      trackList.innerHTML = "";

      results.slice(0, 5).forEach((track, index) => {
        const li = document.createElement("li");
        li.className = "d-flex align-items-center py-2 border-top border-secondary flex-wrap";

        li.innerHTML = `
          <span class="me-3">${index + 1}</span>
          <img src="${track.album.cover_small}" class="track-img me-3 img-fluid" alt="${track.title}">
          <div class="flex-grow-1">
            <strong>${track.title}</strong><br />
            <small>${artist.name}</small>
          </div>
          <span class="ms-auto">${Math.floor(track.duration / 60)}:${String(track.duration % 60).padStart(2, "0")}</span>
        `;
        trackList.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Errore durante il caricamento artista:", error);
  }
});

// Home

const homeBtn = document.getElementById("home-button");
homeBtn.addEventListener("click", () => {
  window.location.assign(`index.html`);
});

const container = document.getElementById("container-album");

// Crea il div principale
const albumContainer = document.createElement("div");
albumContainer.id = "container-album";
albumContainer.className = "container col-12 col-md-10 col-lg-9 text-light pt-1";

// Artist Header
const artistHeader = document.createElement("div");
artistHeader.className = "artist-header text-white";

const headerTop = document.createElement("div");
headerTop.className = "d-flex align-items-center justify-content-between w-100 p-3 position-absolute top-0 start-0";
headerTop.style.zIndex = 10;

// Frecce
const arrowsDiv = document.createElement("div");
arrowsDiv.className = "d-none d-sm-inline-flex d-flex align-items-center gap-3";

const leftArrow = document.createElement("i");
leftArrow.className = "bi bi-arrow-left-circle-fill nav-arrow";
leftArrow.style.cssText = "font-size: 30px; cursor: pointer;";
leftArrow.addEventListener("click", () => {
  window.location.href = "album-page.html"; // or the correct relative path to your homepage
});

const rightArrow = document.createElement("i");
rightArrow.className = "bi bi-arrow-right-circle-fill nav-arrow";
rightArrow.style.cssText = "font-size: 30px; cursor: pointer;";
rightArrow.addEventListener("click", () => {
  window.location.href = "index.html"; // or the correct relative path to your homepage
});

arrowsDiv.appendChild(leftArrow);
arrowsDiv.appendChild(rightArrow);

// Profilo
const profileDiv = document.createElement("div");
profileDiv.className = "profile me-2";

const profileInner = document.createElement("div");
profileInner.className = "d-none d-sm-inline-flex align-items-center bg-dark text-white px-2 py-1";
profileInner.style.borderRadius = "50px";

const profileImg = document.createElement("img");
profileImg.src = "./assets/imgs/search/image-1.jpeg";
profileImg.alt = "";
profileImg.style.cssText = "border-radius: 50%; width: 20px";
profileImg.className = "me-2";

const profileText = document.createElement("span");
profileText.innerHTML = 'Lidia Nautilus... <i class="bi bi-caret-down-fill ms-1"></i>';

profileInner.appendChild(profileImg);
profileInner.appendChild(profileText);
profileDiv.appendChild(profileInner);

headerTop.appendChild(arrowsDiv);
headerTop.appendChild(profileDiv);

// Artist Info
const artistInfo = document.createElement("div");
artistInfo.className = "artist-info";

const verifiedDiv = document.createElement("div");
verifiedDiv.className = "d-flex align-items-center mb-2 flex-wrap";

const verifiedImg = document.createElement("img");
verifiedImg.src = "https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg";
verifiedImg.className = "verified-badge img-fluid";
verifiedImg.alt = "verified";

const verifiedSpan = document.createElement("span");
verifiedSpan.textContent = "Artista verificato";

verifiedDiv.appendChild(verifiedImg);
verifiedDiv.appendChild(verifiedSpan);

const artistName = document.createElement("h1");
artistName.textContent = "Yellowcard";

const listeners = document.createElement("p");
listeners.textContent = "3.433.158 ascoltatori mensili";

artistInfo.appendChild(verifiedDiv);
artistInfo.appendChild(artistName);
artistInfo.appendChild(listeners);

artistHeader.appendChild(headerTop);
artistHeader.appendChild(artistInfo);

// Container principale
const mainContainer = document.createElement("div");
mainContainer.className = "container my-3";

const buttonsDiv = document.createElement("div");
buttonsDiv.className = "d-flex align-items-center mb-4 flex-wrap gap-5";

const playButton = document.createElement("button");
playButton.id = "play-button";
playButton.className = "btn btn-success btn-lg rounded-circle d-flex align-items-center justify-content-center position-relative";
playButton.style.cssText = "width: 56px; height: 56px;";

const playIcon = document.createElement("i");
playIcon.id = "play-icon";
playIcon.className = "bi bi-play-fill fs-2";
playIcon.style.cssText = "color: black; margin-left: 2px;";

playButton.appendChild(playIcon);

const followButton = document.createElement("button");
followButton.className = "btn btn-outline-light";
followButton.textContent = "Following";

const menuButton = document.createElement("button");
menuButton.className = "btn btn-dark rounded-circle d-flex align-items-center justify-content-center";
menuButton.style.cssText = "width: 40px; height: 40px; background-color: transparent;";

const menuIcon = document.createElement("i");
menuIcon.className = "bi bi-three-dots text-secondary fs-3";

menuButton.appendChild(menuIcon);

buttonsDiv.appendChild(playButton);
buttonsDiv.appendChild(followButton);
buttonsDiv.appendChild(menuButton);

// Row principale
const row = document.createElement("div");
row.className = "row";

// Sezione Popolari
const popularCol = document.createElement("div");
popularCol.className = "col-lg-8 col-md-12 mb-4";

const popularTitle = document.createElement("h4");
popularTitle.className = "mb-3";
popularTitle.textContent = "Popolari";

const trackList = document.createElement("ul");
trackList.className = "list-unstyled";

function createTrackItem(num, title, listeners) {
  const li = document.createElement("li");
  li.className = "d-flex align-items-center py-2 border-top border-secondary flex-wrap";

  li.innerHTML = `
    <span class="me-3">${num}</span>
    <img src="your-album.jpg" class="track-img me-3 img-fluid" alt="${title}">
    <div class="flex-grow-1">${title}</div>
    <div class="text-end me-4">${listeners}</div>
    
  `;

  return li;
}

trackList.appendChild(createTrackItem(1, "Ocean Avenue", "276.616.912", "3:18"));
trackList.appendChild(createTrackItem(2, "Only One", "98.839.244", "4:17"));

const viewMore = document.createElement("a");
viewMore.href = "#";
viewMore.className = "text-white text-decoration-none mb-3 d-inline-block";
viewMore.textContent = "VISUALIZZA ALTRO";

popularCol.appendChild(popularTitle);
popularCol.appendChild(trackList);
popularCol.appendChild(viewMore);

// Colonna Brani che ti piacciono
const likedCol = document.createElement("div");
likedCol.className = "col-lg-4 col-md-12";

const likedTitle = document.createElement("h5");
likedTitle.className = "mb-3";
likedTitle.textContent = "Brani che ti piacciono";

const likedBox = document.createElement("div");
likedBox.className = "d-flex align-items-center bg-dark rounded p-3 flex-wrap";

const bandImg = document.createElement("img");
bandImg.src = "assets/imgs/Yellowcard-band-social-sharing-image.jpg";
bandImg.className = "rounded-circle me-3 img-fluid";
bandImg.style.width = "60px";
bandImg.alt = "Yellowcard";

const likedTextDiv = document.createElement("div");
likedTextDiv.innerHTML = `
  <div class="fw-bold">Hai messo Mi piace a 11 brani</div>
  <small class="text-muted">Di Yellowcard</small>
`;

const heartIconDiv = document.createElement("div");
heartIconDiv.className = "ms-auto mt-2 mt-md-0";

const heartIcon = document.createElement("i");
heartIcon.className = "bi bi-heart-fill like-icon";

heartIconDiv.appendChild(heartIcon);

likedBox.appendChild(bandImg);
likedBox.appendChild(likedTextDiv);
likedBox.appendChild(heartIconDiv);

likedCol.appendChild(likedTitle);
likedCol.appendChild(likedBox);

// Assembla tutto
row.appendChild(popularCol);
row.appendChild(likedCol);

mainContainer.appendChild(buttonsDiv);
mainContainer.appendChild(row);

albumContainer.appendChild(artistHeader);
albumContainer.appendChild(mainContainer);

container.appendChild(albumContainer);
