import map from './map';

const DOM = {
  mapWrapper: document.querySelector('.map__wrapper'),
  mapContainer: document.querySelector('.map'),
  chart: document.querySelector('.chart__wrapper'),
  table: document.querySelector('.table__wrapper'),
  list: document.querySelector('.list__wrapper'),
  wrapper: document.querySelector('.full-screen'),
  content: document.querySelector('.wrapper__main'),
  columnOne: document.querySelector('.column__data'),
  columnTwo: document.querySelector('.column__visual'),
  icon: document.querySelectorAll('.icon-resize'),
};

const {
  mapWrapper, mapContainer, chart, table, list, wrapper, content, columnOne, columnTwo, icon,
} = DOM;

const resizeToBig = (target) => {
  target.classList.add('resize');
  content.classList.add('none-visible');
  wrapper.classList.add('visible');
  wrapper.append(target);
  icon.forEach((icon) => {
    icon.classList.add('icon-close');
  });
};

const resizeToSmall = (target) => {
  target.classList.remove('resize');
  chart.style.display = 'flex';
  wrapper.classList.remove('visible');
  content.classList.remove('none-visible');
  icon.forEach((icon) => {
    icon.classList.remove('icon-close');
  });
};

const addEventListenerToResizeButton = () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-resize__map')) {
      if (!wrapper.classList.contains('visible')) {
        resizeToBig(mapWrapper);
        chart.style.display = 'none';
        mapContainer.innerHTML = '<div id="map"></div>';
        map.init();
      } else {
        resizeToSmall(mapWrapper);
        columnTwo.prepend(mapWrapper);
      }
    }
    if (e.target.classList.contains('icon-resize__chart')) {
      if (!wrapper.classList.contains('visible')) {
        resizeToBig(chart);
      } else {
        resizeToSmall(chart);
        columnTwo.append(chart);
      }
    }
    if (e.target.classList.contains('icon-resize__table')) {
      if (!wrapper.classList.contains('visible')) {
        chart.style.display = 'none';
        resizeToBig(table);
      } else {
        chart.style.display = 'none';
        resizeToSmall(table);
        columnOne.prepend(table);
      }
    }
    if (e.target.classList.contains('icon-resize__list')) {
      if (!wrapper.classList.contains('visible')) {
        chart.style.display = 'none';
        resizeToBig(list);
      } else {
        chart.style.display = 'none';
        resizeToSmall(list);
        columnOne.append(list);
      }
    }
  });

  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && wrapper.classList.contains('visible')) {
      resizeToSmall(table);
      columnOne.prepend(table);
      resizeToSmall(list);
      columnOne.append(list);
      resizeToSmall(chart);
      columnTwo.append(chart);
      resizeToSmall(mapWrapper);
      columnTwo.prepend(mapWrapper);
    }
  });
};

export default addEventListenerToResizeButton;
