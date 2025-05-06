const API_URL = "https://deezerdevs-deezer.p.rapidapi.com/search";
const API_KEY = "YOUR_RAPIDAPI_KEY"; // Sostituire con chiave RapidAPI

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
    return data.data; // Restituisce l'array di album
  } catch (error) {
    console.error("Errore:", error);
  }
};

// Funzione per creare striscia di album
const createAlbumRow = (albums, title) => {
  const container = document.getElementById("album-container");

  const row = document.createElement("div");
  row.className = "mb-4";

  const rowTitle = document.createElement("h4");
  rowTitle.textContent = title;
  rowTitle.className = "text-white mb-3";

  const rowContent = document.createElement("div");
  rowContent.className = "d-flex overflow-auto";

  albums.forEach((album) => {
    const albumCard = document.createElement("div");
    albumCard.className = "card bg-dark text-white me-3";
    albumCard.style.width = "150px";

    albumCard.innerHTML = `
      <img src="${album.cover_medium}" class="card-img-top" alt="${album.title}">
      <div class="card-body p-2">
        <p class="card-title mb-1"><strong>${album.title}</strong></p>
        <p class="card-text small">${album.artist.name}</p>
      </div>
    `;

    rowContent.appendChild(albumCard);
  });

  row.appendChild(rowTitle);
  row.appendChild(rowContent);
  container.appendChild(row);
};

// Funzione principale per caricare album
const loadAlbums = async () => {
  const queries = ["queen", "eminem", "beyonce", "coldplay"]; // Artisti o generi da personalizzare
  for (const query of queries) {
    const albums = await fetchAlbums(query);
    if (albums) {
      createAlbumRow(albums.slice(0, 10), `Album di ${query}`);
    }
  }
};

// Qui si avvia il caricamento degli album al caricamento della pagina
window.onload = () => {
  loadAlbums();
};
