const dummyData = {
    January: [
      { lat: 15.3, lng: 73.9, cases: 20 },
      { lat: 15.5, lng: 74.0, cases: 15 }
    ],
    February: [
      { lat: 15.4, lng: 73.8, cases: 10 },
      { lat: 15.6, lng: 74.1, cases: 18 }
    ],
    March: [
      { lat: 15.35, lng: 73.85, cases: 12 },
      { lat: 15.55, lng: 74.05, cases: 9 }
    ],
    April: [
      { lat: 15.33, lng: 73.88, cases: 25 },
      { lat: 15.52, lng: 74.02, cases: 14 }
    ],
    May: [
      { lat: 15.37, lng: 73.95, cases: 30 },
      { lat: 15.57, lng: 74.07, cases: 22 }
    ],
    June: [
      { lat: 15.31, lng: 73.93, cases: 5 },
      { lat: 15.51, lng: 74.03, cases: 8 }
    ],
    July: [
      { lat: 15.34, lng: 73.91, cases: 17 },
      { lat: 15.53, lng: 74.04, cases: 20 }
    ],
    August: [
      { lat: 15.36, lng: 73.89, cases: 19 },
      { lat: 15.56, lng: 74.06, cases: 16 }
    ],
    September: [
      { lat: 15.38, lng: 73.92, cases: 11 },
      { lat: 15.58, lng: 74.08, cases: 13 }
    ],
    October: [
      { lat: 15.32, lng: 73.87, cases: 21 },
      { lat: 15.54, lng: 74.01, cases: 17 }
    ],
    November: [
      { lat: 15.39, lng: 73.96, cases: 24 },
      { lat: 15.59, lng: 74.09, cases: 28 }
    ],
    December: [
      { lat: 15.4, lng: 73.94, cases: 6 },
      { lat: 15.6, lng: 74.1, cases: 10 }
    ]
  };
  
  const map = L.map('map').setView([15.3, 74.0], 9);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  
  let markers = [];
  
  function showCases(month) {
    // Remove previous markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
  
    // Add new markers
    dummyData[month].forEach(data => {
      const marker = L.circleMarker([data.lat, data.lng], {
        radius: data.cases / 2,
        color: 'red',
        fillOpacity: 0.6
      })
        .bindPopup(`${month}: ${data.cases} cases`)
        .addTo(map);
      markers.push(marker);
    });
  }
  
  showCases("January"); // default view
  
  loadHealthCenters(); // show hospitals by default
  
  function loadHealthCenters() {
    fetch('health_centers.json')
      .then(response => response.json())
      .then(centers => {
        centers.forEach(center => {
          L.marker([center.lat, center.lng], {
            icon: L.divIcon({
              className: 'hospital-emoji',
              html: '🏥',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            })
          })
            .bindPopup(`<strong>${center.name}</strong>`)
            .addTo(map);
        });
      });
  }
  