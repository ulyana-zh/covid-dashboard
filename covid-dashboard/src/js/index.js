import { createChart } from './Сhart';
import renderTableBlock from './table/render-table-block';
import renderListBlock from './list/render-list-block';
import './map';
import addEventListenerToResizeButton from './resize';

window.onload = () => {
  renderTableBlock();
  renderListBlock();
  createChart();
  addEventListenerToResizeButton();
};
