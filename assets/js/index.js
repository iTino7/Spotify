const API_URL = "https://deezerdevs-deezer.p.rapidapi.com/search";
const API_KEY = "fab328e384msh921008f1a65af16p1061ebjsne15bd95c0462";

// Funzione per ottenere album da Deezer
const fetchAlbums = async (query) => {
  try {
    const response = await fetch(`${API_URL}?q=${query}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nella chiamata API");
    }

    const data = await response.json();
    return data.data; // Ritorna l'array di album
  } catch (error) {
    console.error("Errore:", error);
    return [];
  }
};

// Funzione per creare una riga di album
const createAlbumRow = (albums, title) => {
  const container = document.getElementById("altro-che-ti-piace"); // ID corretto dal file HTML
  const middleColumn = document.getElementById("middle-column");
  // Creazione del titolo della riga
  const rowTitle = document.createElement("h4");
  rowTitle.textContent = title;
  rowTitle.className = "text-white mb-3"; // Classe per il titolo della riga
  container.appendChild(rowTitle);

  // Creazione del contenitore della riga
  const row = document.createElement("div");
  row.className = "row mb-4"; // Classe per il layout delle righe

  const altroCheTiPiaceSmall = document.createElement(`div`);
  altroCheTiPiaceSmall.id = `altro-che-ti-piace-small`;

  albums.forEach((album) => {
    // Creazione della colonna
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-3 mb-3"; // Classe per le colonne

    // Creazione della card
    const albumCard = document.createElement("div");
    albumCard.className =
      "card bg-dark text-white border-0 d-flex flex-column justify-content-between align-items-center rounded pt-3";

    // Contenuto della card
    albumCard.innerHTML = `
      <img src="${album.album.cover_medium}" class="img-fluid mb-3 rounded" alt="${album.title}">
      <div class="card-body text-center">
        <p class="mb-1 text-truncate"><strong>${album.title}</strong></p>
        <p class="small text-truncate">${album.artist.name}</p>
      </div>
    `;

    // Aggiunta della card alla colonna
    col.appendChild(albumCard);
    albumCard.innerHTML = `
    <img src="${album.album.cover_medium}" class="img-fluid mb-3 rounded album-img" alt="${album.title}">
    <div class="card-body text-center">
      <p class="mb-1 text-truncate"><strong>${album.title}</strong></p>
      <p class="small text-truncate">${album.artist.name}</p>
    </div>
  `;
    // Aggiunta dell'evento click all'immagine
    const albumImg = albumCard.querySelector(".album-img");

    albumImg.addEventListener("click", () => {
      window.location.assign(`album-page.html?search=${album.artist.name}`);
    });

    console.log(album);
    // Aggiunta della colonna alla riga
    row.appendChild(col);

    altroCheTiPiaceSmall.className =
      "d-flex d-md-none flex-column mb-3 pt-3 bg-dark rounded";
    altroCheTiPiaceSmall.innerHTML = `<div class="d-flex w-100">
              <div class="w-50 d-flex justify-content-center aligh-items-center">
                <img src="${album.album.cover_medium}" class="img-fluid mb-4" alt="placeholder" />
              </div>
              <div>
                <p>Playlist</p>
                <p>${album.title}</p>
              </div>
            </div>
            <div class="d-flex justify-content-between px-3">
              <div>
                <i class="bi bi-heart-fill"></i>
                <i class="bi bi-three-dots-vertical"></i>
              </div>
              <div class="d-flex justify-content-around w-25">
                <p>Numero canzoni</p>
                <i class="bi bi-play-circle-fill"></i>
              </div>
            </div>`;
    middleColumn.appendChild(altroCheTiPiaceSmall);
  });

  // Aggiunta della riga al contenitore principale

  container.appendChild(row);
};

// Funzione per caricare album casuali
const loadAlbums = async () => {
  const container = document.getElementById("altro-che-ti-piace");
  container.innerHTML = ""; // Pulisce il contenitore

  // Generazione lettera casuale per la ricerca
  const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Lettere da 'a' a 'z'

  // Ricerca casuale
  const albums = await fetchAlbums(randomLetter);

  if (albums && albums.length > 0) {
    // Estrazione artisti unici dagli album
    const uniqueArtists = [
      ...new Set(albums.map((album) => album.artist.name)),
    ];

    // Limitazione a 4 artisti casuali
    const randomArtists = uniqueArtists.slice(0, 4);

    // Caricamento album per ogni artista
    for (const artist of randomArtists) {
      const artistAlbums = await fetchAlbums(artist);
      if (artistAlbums && artistAlbums.length > 0) {
        createAlbumRow(artistAlbums.slice(0, 4), `Album di ${artist}`);
      }
    }
  } else {
    container.innerHTML = `<p class="text-white">Nessun album trovato.</p>`;
  }
};

//ARROW-STYLE
const arrowStyle = (str, add, value) => {
  str.addEventListener(add, () => {
    str.style.opacity = value;
    str.style.transition = "0.8s";
  });
};

const arrowContainer = document.getElementById("arrow-container");
// Avvia il caricamento degli album al caricamento della pagina
window.onload = () => {
  loadAlbums();

  //ARROW D-FLEX
  const containerArrow = document.createElement("div");
  containerArrow.className = "arrow d-flex";
  //P-ARROW-LEFT
  const pLeft = document.createElement("p");
  pLeft.className = "ms-1 m-0";
  // ARROW-LEFT
  const buttonArrowLeft = document.createElement("button");
  buttonArrowLeft.style.border = "none";
  buttonArrowLeft.style.backgroundColor = "transparent";
  const hrefArrowLeft = document.createElement("a");
  hrefArrowLeft.href = "album-page.html";

  const arrowLeft = document.createElement("i");
  arrowLeft.className = "d-none d-sm-block bi bi-arrow-left-circle-fill";
  arrowLeft.style.color = "white";
  arrowLeft.style.fontSize = "30px";
  arrowLeft.style.opacity = "0.3";
  arrowStyle(arrowLeft, "mouseenter", "0.8");
  arrowStyle(arrowLeft, "mouseleave", "0.3");

  //P-ARROW-RIGHT
  const pRight = document.createElement("p");
  pRight.className = "ms-2";
  //ARROW-RIGHT
  const arrowRight = document.createElement("i");
  arrowRight.className = "d-none d-sm-block bi bi-arrow-right-circle-fill";
  arrowRight.style.color = "white";
  arrowRight.style.fontSize = "30px";
  arrowRight.style.opacity = "0.3";
  arrowStyle(arrowRight, "mouseenter", "0.8");
  arrowStyle(arrowRight, "mouseleave", "0.3");

  hrefArrowLeft.appendChild(arrowLeft);
  buttonArrowLeft.append(hrefArrowLeft);
  containerArrow.append(pLeft, buttonArrowLeft, pRight, arrowRight);
  arrowContainer.appendChild(containerArrow);
};

document.addEventListener("DOMContentLoaded", () => {
  const micBtn = document.getElementById("mic-btn");
  const listBtn = document.getElementById("list-btn");
  const pcBtn = document.getElementById("pc-btn");
  const volumeBtn = document.querySelector(".volume-btn");
  const volumeSlider = document.querySelector(".volume-slider");

  const hideBtn = document.getElementById("nascondi-btn");
  const album = document.getElementById("album");

  volumeBtn.addEventListener("click", () => {
    volumeSlider.classList.toggle("d-none");
    micBtn.classList.toggle("d-none");
    listBtn.classList.toggle("d-none");
    pcBtn.classList.toggle("d-none");
  });

  hideBtn.addEventListener("click", () => {
    album.classList.toggle("d-lg-none");
  });

  const searchIcon = document.getElementById("search-icon");
  const searchContainer = document.getElementById("search-container");
  const searchInput = document.getElementById("search-input");
  const container = document.getElementById("altro-che-ti-piace");

  // Appare il campo di ricerca al click
  searchIcon.addEventListener("click", () => {
    searchContainer.classList.toggle("d-none");
    searchInput.focus();
  });

  // Gestione della ricerca
  searchInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        // Svuota il campo di ricerca
        container.innerHTML = "";

        // Ricerca gli album
        const albums = await fetchAlbums(query);
        if (albums && albums.length > 0) {
          createAlbumRow(albums.slice(0, 8), `Album di ${query}`);
        } else {
          container.innerHTML = `<p class="text-white">Nessun album trovato per "${query}".</p>`;
        }
      }
    }
  });

  const closeWindowBtn = document.getElementById("close-window");
  const friendsBlocks = document.querySelectorAll(".friends-block");

  closeWindowBtn.addEventListener("click", () => {
    friendsBlocks.forEach((block) => {
      block.classList.add("d-none"); // Aggiunge la classe d-none a ogni elemento
    });
  });
});
