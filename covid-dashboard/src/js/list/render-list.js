import state from '../state';
import renderStatistics from '../table/render-statistics';
import '../../sass/list/list.css';

function renderList(list) {
  const listWrapper = document.createElement('div');
  listWrapper.classList.add('list-wrapper');

  const mode = state.currentListMode;

  list.sort((a, b) => b[mode] - a[mode]);
  list.forEach((country) => {
    const countryBlock = document.createElement('div');
    countryBlock.innerHTML = `<div class="list-wrapper__country-block">
                <div style="display: flex">
                    <img style="margin-right: 5px;" src=${country.flag}>
                    <div style="margin-right: 10px;">${country.area}</div>
                </div>
                <div>${country[mode]}</div>
            </div>`;

    countryBlock.addEventListener('click', () => {
      state.isGlobal = false;
      state.currentCountry = country.id;
      timeChoice1.checked = true;
      rangeChoice1.checked = true;
      renderStatistics(country);
    });

    listWrapper.append(countryBlock);
  });

  return listWrapper;
}

export default renderList;
