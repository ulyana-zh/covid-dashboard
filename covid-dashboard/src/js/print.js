import print from '../assets/icons/print.svg';
import globe from '../assets/icons/globe.png';

function printDiv(divName) {
  const printContents = document.getElementById(divName).innerHTML;
  const originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
  document.location.reload();
}

const printData = {
  data: null,
  dataAll: null,

  init() {
    fetch('https://corona.lmao.ninja/v2/countries')
      .then((result) => result.json())
      .then((result) => {
        this.data = result;
        const icon = document.createElement('div');
        icon.classList.add('print-icon');
        const img = document.createElement('img');
        img.src = 'assets/print.svg';
        icon.appendChild(img);
        img.addEventListener('click', () => {
          this.renderCard();
          printDiv('printableArea');
        });

        document.querySelector('.table-content__name').appendChild(icon);
      });

    fetch('https://corona.lmao.ninja/v3/covid-19/all')
      .then((result) => result.json())
      .then((result) => {
        this.dataAll = result;
      });
  },

  renderCard() {
    const country = document.getElementById('tableArea');
    let currentCountry;
    if (country.innerText === 'Global') {
      currentCountry = this.dataAll;
      currentCountry.flag = 'assets/globe.png';
    } else {
      const getCurrentCoutry = () => {
        let obj = {};
        this.data.forEach((element) => {
          if (element.country === country.innerText) {
            obj = element;
          }
        });

        return obj;
      };

      currentCountry = getCurrentCoutry();
    }

    const title = document.createElement('div');
    title.classList.add('title-print');
    const titleFlag = document.createElement('img');
    const titleName = document.createElement('span');
    if (country.innerText === 'Global') {
      titleFlag.src = currentCountry.flag;
      titleName.innerText = 'All world';
    } else {
      titleFlag.src = currentCountry.countryInfo.flag;
      titleName.innerText = `${currentCountry.continent}, ${currentCountry.country}`;
    }

    title.appendChild(titleFlag);
    title.appendChild(titleName);

    const updateDate = document.createElement('div');
    updateDate.classList.add('update-print');
    updateDate.innerText = `${document.querySelector('.today').innerText}`;

    const table = document.createElement('div');
    table.classList.add('table-print');
    table.innerHTML = `<div class="table-print-title">Cases, deaths and recovered</div>
    <div class="table-print-head">
    <div></div>
    <div>All time</div>
    <div>Today</div>
  </div>
  <div class="table-print-cases">
    <div class="title">Cases</div>
    <div>${currentCountry.cases}</div>
    <div>${currentCountry.todayCases}</div>
  </div>
  <div class="table-print-deaths">
    <div class="title">Deaths</div>
    <div>${currentCountry.deaths}</div>
    <div>${currentCountry.todayDeaths}</div>
  </div>
  <div class="table-print-recovered">
    <div class="title">Recovered</div>
    <div>${currentCountry.recovered}</div>
    <div>${currentCountry.todayRecovered}</div>
  </div>
  <div class="table-print-cases">
    <div class="title">Сases per 100,000 people</div>
    <div>${((currentCountry.cases * 100000) / currentCountry.population).toFixed(1)}</div>
    <div>${((currentCountry.todayCases * 100000) / currentCountry.population).toFixed(1)}</div>
  </div>
  <div class="table-print-deaths">
    <div class="title">Deaths per 100,000 people</div>
    <div>${((currentCountry.deaths * 100000) / currentCountry.population).toFixed(1)}</div>
    <div>${((currentCountry.todayDeaths * 100000) / currentCountry.population).toFixed(1)}</div>
  </div>
  <div class="table-print-recovered bottom">
    <div class="title">Recovered per 100,000 people</div>
    <div>${((currentCountry.recovered * 100000) / currentCountry.population).toFixed(1)}</div>
    <div>${((currentCountry.todayRecovered * 100000) / currentCountry.population).toFixed(1)}</div>
  </div>`;

    const secondTable = document.createElement('div');
    secondTable.classList.add('second-table-print');
    secondTable.innerHTML = `<div class="table-print-title">Testing</div>
    <div class="second-table-print-head">
    <div>Tests</div>
    <div>Tests per 100,000 people</div>
  </div>
  <div class="second-table-print-cases">
    <div>${currentCountry.tests}</div>
    <div>${((currentCountry.tests * 100000) / currentCountry.population).toFixed(1)}</div>
  </div>`;

    document.querySelector('.print-data').appendChild(title);
    document.querySelector('.print-data').appendChild(updateDate);
    document.querySelector('.print-data').appendChild(table);
    document.querySelector('.print-data').appendChild(secondTable);
  },
};

printData.init();
