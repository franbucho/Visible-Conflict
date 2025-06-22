let language = 'es';
let map;
let markersLayer;

const translations = {
  es: {
    title: "Mapa de Conflictos Mundiales",
    tipo: "Tipo",
    fecha: "Fecha",
    descripcion: "Descripción"
  },
  en: {
    title: "World Conflict Map",
    tipo: "Type",
    fecha: "Date",
    descripcion: "Description"
  }
};

const newsItems = {
  es: [
    "Bombardeo con B-2 Spirit en Natanz y Fordow reportado el 21 de junio.",
    "Aviones KC-46 Pegasus apoyaron la misión con reabastecimiento aéreo.",
    "Dron no identificado sobrevoló Shiraz antes de los ataques.",
    "Sigue la tensión en Medio Oriente con múltiples incidentes militares."
  ],
  en: [
    "B-2 Spirit bombing on Natanz and Fordow reported on June 21.",
    "KC-46 Pegasus planes supported the mission with aerial refueling.",
    "Unidentified drone spotted over Shiraz before the attacks.",
    "Tensions escalate in the Middle East with multiple military incidents."
  ]
};

function updateNewsTicker() {
  const ticker = document.getElementById('news-ticker');
  if (!ticker) return;
  const text = newsItems[language].join("     ***     ");
  ticker.textContent = text + "     ***     " + text;
}

function setLanguage(lang) {
  language = lang;
  document.getElementById('title').innerText = translations[lang].title;
  updateNewsTicker();
  loadMapData();
}

function initMap() {
  map = L.map('map').setView([20, 0], 2); // Vista global 🌍

  // Tile layer en inglés
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CartoDB</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  markersLayer = L.layerGroup().addTo(map);
}

function loadMapData() {
  if (!markersLayer) return;
  markersLayer.clearLayers();

  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      data.forEach(event => {
        const popup = `
          <strong>${event.nombre}</strong><br>
          <strong>${translations[language].tipo}:</strong> ${event.tipo}<br>
          <strong>${translations[language].fecha}:</strong> ${event.fecha}<br>
          <strong>${translations[language].descripcion}:</strong> ${event.descripcion}
        `;

        const tooltip = `${event.nombre}: ${event.tipo}`;

        L.marker([event.lat, event.lng])
          .addTo(markersLayer)
          .bindPopup(popup)
          .bindTooltip(tooltip, { permanent: false, direction: "top" });
      });
    })
    .catch(err => {
      console.error("Error cargando data.json:", err);
    });
}

window.onload = () => {
  initMap();
  setLanguage('es');
};
