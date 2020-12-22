import store from '../store';
import state from '../state';
import renderList from './render-list';
import '../../sass/list/list.css';

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

  const searchInput = document.querySelector('#search-country');
  searchInput.classList.add('search-input');
  searchInput.addEventListener('input', searchHandler);
  searchInput.addEventListener('focus', searchHandler);

  function searchHandler() {
    list.removeChild(list.lastChild);
    store.getAllCountriesData().then((data) => {
      const searchRequest = searchInput.value;
      const searchedList = data.filter((country) => country.area.toLowerCase().startsWith(searchRequest.toLowerCase()));
      list.append(renderList(searchedList));
    });
  }
}

export default renderListBlock;
