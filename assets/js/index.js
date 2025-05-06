const API_URL = "https://deezerdevs-deezer.p.rapidapi.com/search";
const API_KEY = "fab328e384msh921008f1a65af16p1061ebjsne15bd95c0462"; // Sostituire con chiave RapidAPI

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
    return [];
  }
};

// Funzione per creare una striscia di album
const createAlbumRow = (albums, title) => {
  const container = document.getElementById("altro-che-ti-piace"); // ID corretto dal file HTML

  // Creazione del titolo della riga
  const rowTitle = document.createElement("h4");
  rowTitle.textContent = title;
  rowTitle.className = "text-white mb-3"; // Classe per il titolo della riga
  container.appendChild(rowTitle);

  // Creazione del contenitore della riga
  const row = document.createElement("div");
  row.className = "row mb-4"; // Classe per il layout delle righe

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

    // Aggiunta della colonna alla riga
    row.appendChild(col);
  });

  // Aggiunta della riga al contenitore principale
  container.appendChild(row);
};

// Funzione principale per caricare album
const loadAlbums = async () => {
  const queries = ["Imagine Dragons", "Bruno Mars", "Shakira", "One Republic"]; // Artisti o generi da personalizzare
  for (const query of queries) {
    const albums = await fetchAlbums(query);
    if (albums && albums.length > 0) {
      createAlbumRow(albums.slice(0, 4), `Album di ${query}`); // Mostra solo 4 album per riga
    }
  }
};

// Avvia il caricamento degli album al caricamento della pagina
window.onload = () => {
  loadAlbums();
};
