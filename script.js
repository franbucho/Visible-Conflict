let language = 'es';

const translations = {
  es: {
    title: "Mapa de Conflicto en Irán",
    tipo: "Tipo",
    fecha: "Fecha",
    descripcion: "Descripción"
  },
  en: {
    title: "Iran Conflict Map",
    tipo: "Type",
    fecha: "Date",
    descripcion: "Description"
  }
};

function setLanguage(lang) {
  language = lang;
  document.getElementById('title').innerText = translations[lang].title;
  loadMap(); // recargar con popups traducidos
}

function loadMap() {
  document.getElementById('map').innerHTML = "";
  const map = L.map('map').setView([32.4279, 53.6880], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
  }).addTo(map);

  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      data.forEach(event => {
        const popup = `
          <strong>${translations[language].tipo}:</strong> ${event.tipo}<br>
          <strong>${translations[language].fecha}:</strong> ${event.fecha}<br>
          <strong>${translations[language].descripcion}:</strong> ${event.descripcion}
        `;
        L.marker([event.lat, event.lng]).addTo(map).bindPopup(popup);
      });
    });
}

window.onload = () => {
  setLanguage('es');
};
