import store from '../store';
import state from '../state';
import renderList from './render-list';
import '../../sass/list/list.css';
import renderStatistics from '../table/render-statistics';

function renderListBlock() {
  const list = document.querySelector('#list');

  store.getAllCountriesData().then((data) => {
    list.append(renderList(data));
    state.allCountriesList = data;
  });

  document.querySelector('select').addEventListener('change', (event) => {
    state.currentListMode = event.currentTarget.value;
    list.removeChild(list.lastChild);
    store.getAllCountriesData().then((data) => {
      list.append(renderList(state.searchedList ? state.searchedList : data));
    });
  });

  const searchInput = document.querySelector('#search-country');
  searchInput.classList.add('search-input');
  searchInput.addEventListener('input', searchHandler);
  searchInput.addEventListener('focus', searchHandler);
  searchInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });

  function searchHandler() {
    if (searchInput.value === '') {
      store.getGlobalData().then((data) => {
        renderStatistics(data);
        state.isGlobal = true;
      });
    }
    list.removeChild(list.lastChild);

    const searchRequest = searchInput.value;
    const searchedList = state.allCountriesList.filter((country) => country.area.toLowerCase().startsWith(searchRequest.toLowerCase()));
    state.searchedList = searchedList;
    list.append(renderList(searchedList));

    // store.getAllCountriesData().then((data) => {
    //   const searchRequest = searchInput.value;
    //   const searchedList = data.filter(country => country.area.toLowerCase().startsWith(searchRequest.toLowerCase()));
    //   state.searchedList = searchedList;
    //   list.append(renderList(searchedList));
    // });
  }
}

export default renderListBlock;
