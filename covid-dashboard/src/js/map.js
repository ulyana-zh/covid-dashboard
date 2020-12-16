const map = {
  map: null,
  mapOptions: {
    center: [17, 40],
    zoom: 2,
    minZoom: 2,
    maxZoom: 10,
    worldCopyJump: true
  },
  data: null,

  init() {
    this.map = new L.map('map', this.mapOptions);
    this.map.setMaxBounds([
      [85, 360],
      [-85, -360]
    ]);
    const layer = new L.TileLayer('https://api.mapbox.com/styles/v1/rhjje/ckiovl3j355s917s7xr7f0dp3/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmhqamUiLCJhIjoiY2tpb3ZrempwMWdmdjJxcGs2aXd6ZDBkZCJ9.vfPqNa2OHBkAWbQFi8RzkA');
    this.map.addLayer(layer);

    fetch("https://corona.lmao.ninja/v2/countries")
      .then((result) => result.json())
      .then((result) => {
        this.data = result;
        map.setMarkers('cases');
      });
  },

  setMarkers(value) {
    const dataMarkers = [];
    this.data.forEach((element) => {
      let temp = {
        latitude: element.countryInfo.lat,
        longitude: element.countryInfo.long,
        country: element.country
      };
      for (const prop in element) {
        if (prop === value) {
          temp.selectValue = element[prop];
        }
      }
      dataMarkers.push(temp);
    });

    dataMarkers.sort((a, b) => {
      if (a.selectValue > b.selectValue) {
        return 1;
      }
      if (a.selectValue < b.selectValue) {
        return -1;
      }
      return 0;
    });

    let node = document.querySelector('.leaflet-marker-pane');
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }

    for (let i = 0; i < dataMarkers.length; i += 1) {
      const size = (i + 1) / dataMarkers.length;
      const iconOptions = {
        iconUrl: '../src/assets/icons/marker.svg',
        iconSize: [Math.trunc(40 * size), Math.trunc(40 * size)]
      }
      const customIcon = L.icon(iconOptions);

      const markerOptions = {
        title: `${dataMarkers[i].country}\n${value[0].toUpperCase() + value.slice(1)}: ${dataMarkers[i].selectValue}`,
        clickable: true,
        draggable: false,
        icon: customIcon,
        opacity: 0.5,
      }
      const marker = L.marker([dataMarkers[i].latitude, dataMarkers[i].longitude], markerOptions);
      marker.addTo(this.map);
    }
  },
};

map.init();