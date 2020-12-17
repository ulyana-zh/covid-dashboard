/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
import marker from '../assets/icons/marker.svg';
import legend from '../assets/icons/legend.svg';
import close from '../assets/icons/close.svg';

const map = {
  map: null,
  mapOptions: {
    center: [17, 40],
    zoom: 2,
    minZoom: 2,
    maxZoom: 10,
    worldCopyJump: true,
  },
  data: null,
  buttonOpenLegend: null,
  buttonCloseLegend: null,
  legend: null,

  init() {
    this.map = new L.map('map', this.mapOptions);
    this.map.setMaxBounds([
      [85, 360],
      [-85, -360],
    ]);
    const layer = new L.TileLayer('https://api.mapbox.com/styles/v1/rhjje/ckiovl3j355s917s7xr7f0dp3/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmhqamUiLCJhIjoiY2tpb3ZrempwMWdmdjJxcGs2aXd6ZDBkZCJ9.vfPqNa2OHBkAWbQFi8RzkA');
    this.map.addLayer(layer);

    fetch('https://corona.lmao.ninja/v2/countries')
      .then((result) => result.json())
      .then((result) => {
        this.data = result;
        map.setMarkers('cases');
      });

    this.buttonOpenLegend = document.querySelector('.map-legend-button > img');
    this.legend = document.querySelector('.map-legend-content');

    this.buttonOpenLegend.addEventListener('click', () => {
      this.legend.classList.remove('disabled');
    });
  },

  setMarkers(value) {
    const dataMarkers = [];
    this.data.forEach((element) => {
      const temp = {
        latitude: element.countryInfo.lat,
        longitude: element.countryInfo.long,
        country: element.country,
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

    const legendMap = document.querySelector('.map-legend-content');
    legendMap.innerHTML = `<div class="legend-title">${value[0].toUpperCase() + value.slice(1)}</div>
    <div class="close-button">
      <img src="assets/close.svg">
    </div>`;
    for (let i = dataMarkers.length; i > 0; i -= 22) {
      const size = Math.trunc(40 * ((i + 1) / dataMarkers.length));
      legendMap.innerHTML += `<div>
        <div>
          <img src="./assets/marker.svg" style="width: ${size}px; height: ${size}px;">
        </div>
        <span> > ${dataMarkers[i - 22].selectValue} - ${dataMarkers[i - 1].selectValue}</span>
      </div>`;
    }

    this.buttonCloseLegend = document.querySelector('.close-button > img');
    this.buttonCloseLegend.addEventListener('click', () => {
      this.legend.classList.add('disabled');
    });

    const node = document.querySelector('.leaflet-marker-pane');
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }

    for (let i = 0; i < dataMarkers.length; i += 1) {
      const size = (i + 1) / dataMarkers.length;
      const iconOptions = {
        iconUrl: './assets/marker.svg',
        iconSize: [Math.trunc(40 * size), Math.trunc(40 * size)],
      };
      const customIcon = L.icon(iconOptions);

      const markerOptions = {
        title: `${dataMarkers[i].country}\n${value[0].toUpperCase() + value.slice(1)}: ${dataMarkers[i].selectValue}`,
        clickable: true,
        draggable: false,
        icon: customIcon,
        opacity: 0.5,
      };
      const mark = L.marker([dataMarkers[i].latitude, dataMarkers[i].longitude], markerOptions);
      mark.addTo(this.map);
    }
  },
};

map.init();
