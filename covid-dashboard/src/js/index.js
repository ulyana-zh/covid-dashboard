import createChart from './Сhart';
import renderTableBlock from './table/render-table-block';
import renderListBlock from './list/render-list-block';
import './map';
import addEventListenerToResizeButton from './resize';
import addEventListenersToSelects from './listeners';
import './keyboard';

window.onload = () => {
  renderTableBlock();
  renderListBlock();
  createChart();
  addEventListenerToResizeButton();
  addEventListenersToSelects();
};
