// Initialize the map
const map = L.map('map').setView([15.2993, 74.1240], 10);

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Health centre locations
const healthCentres = [
  "Aldona", "Balli", "Betki", "Candolim", "Cansarvarne", "Cansaulim", "Chimbel",
  "Chinchinim", "Colvale", "Corlim", "Cortalim", "Curtorim", "Loutolim", "Marcaim",
  "Mayem", "Navelim", "Pillem Dharbandora", "Ponda", "Porvorim", "Quepem", "Sanguem",
  "Shiroda", "Siolim", "Mapusa", "Margao", "Panaji", "Vasco", "Bicholim", "Canacona",
  "Curchorem", "Pernem", "Sankhali", "Valpoi", "Chicalim"
];

// Dummy lat/lngs for the health centres (manually filled with some spacing)
const centreCoordinates = {
  "Aldona": [15.600, 73.900],
  "Balli": [15.100, 74.100],
  "Betki": [15.450, 74.000],
  "Candolim": [15.520, 73.770],
  "Cansarvarne": [15.750, 73.900],
  "Cansaulim": [15.330, 73.910],
  "Chimbel": [15.470, 73.870],
  "Chinchinim": [15.200, 73.980],
  "Colvale": [15.630, 73.850],
  "Corlim": [15.450, 74.000],
  "Cortalim": [15.370, 73.920],
  "Curtorim": [15.250, 74.010],
  "Loutolim": [15.310, 73.960],
  "Marcaim": [15.390, 74.000],
  "Mayem": [15.600, 74.030],
  "Navelim": [15.260, 74.030],
  "Pillem Dharbandora": [15.280, 74.160],
  "Ponda": [15.400, 74.020],
  "Porvorim": [15.540, 73.830],
  "Quepem": [15.220, 74.100],
  "Sanguem": [15.200, 74.160],
  "Shiroda": [15.300, 74.070],
  "Siolim": [15.630, 73.760],
  "Mapusa": [15.590, 73.820],
  "Margao": [15.280, 73.950],
  "Panaji": [15.490, 73.830],
  "Vasco": [15.400, 73.820],
  "Bicholim": [15.600, 74.000],
  "Canacona": [15.010, 74.020],
  "Curchorem": [15.250, 74.100],
  "Pernem": [15.730, 73.790],
  "Sankhali": [15.580, 74.020],
  "Valpoi": [15.530, 74.150],
  "Chicalim": [15.380, 73.830]
};

// Add 🏥 icons to map
for (const [location, coords] of Object.entries(centreCoordinates)) {
  L.marker(coords, {
    icon: L.divIcon({
      className: 'hospital-icon',
      html: '🏥',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    })
  }).addTo(map).bindPopup(location);
}

// Dummy monthly case data
const caseData = {
  January: generateCases(1),
  February: generateCases(2),
  March: generateCases(3),
  April: generateCases(4),
  May: generateCases(5),
  June: generateCases(6),
  July: generateCases(7),
  August: generateCases(8),
  September: generateCases(9),
  October: generateCases(10),
  November: generateCases(11),
  December: generateCases(12)
};

const monthColors = {
  January: "red",
  February: "orange",
  March: "green",
  April: "blue",
  May: "purple",
  June: "teal",
  July: "maroon",
  August: "brown",
  September: "cyan",
  October: "magenta",
  November: "lime",
  December: "black"
};

let displayedCases = [];

function generateCases(monthIndex) {
  const keys = Object.keys(centreCoordinates);
  return keys.map((key, i) => {
    const base = centreCoordinates[key];
    return {
      name: key,
      lat: base[0] + 0.01 * (monthIndex - 1),
      lng: base[1] + 0.01 * (monthIndex - 1)
    };
  });
}

function showCases(month) {
  if (!caseData[month]) return;

  const color = monthColors[month];
  const cases = caseData[month];

  cases.forEach(c => {
    const marker = L.circleMarker([c.lat, c.lng], {
      radius: 8,
      color: color,
      fillColor: color,
      fillOpacity: 0.8
    }).addTo(map).bindPopup(`${month} Case: ${c.name}`);
    displayedCases.push(marker);
  });
}

function resetCases() {
  displayedCases.forEach(m => map.removeLayer(m));
  displayedCases = [];
}
