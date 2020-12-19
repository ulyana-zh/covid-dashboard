import store from '../store';
import state from '../state';
import renderList from './render-list';

function renderListBlock() {
  const list = document.querySelector('#list');

  store.getAllCountriesData().then((data) => {
    list.append(renderList(data));
  });

  document.querySelector('select').addEventListener('change', (event) => {
    state.currentListMode = event.currentTarget.value;
    list.removeChild(list.lastChild);
    store.getAllCountriesData().then((data) => {
      list.append(renderList(data));
    });
  });
}

export default renderListBlock;
