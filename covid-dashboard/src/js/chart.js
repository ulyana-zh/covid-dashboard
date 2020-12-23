import store from './store';
import state from './state';

const regeneratorRuntime = require('regenerator-runtime');

const createDataArrayForEachDay = (data) => {
  const targetArray = [];
  for (let i = 0; i < data.length - 1; i++) {
    targetArray[i] = data[i + 1] - data[i];
  }
  return targetArray;
};

const getData = (data) => {
  const MAX = 1000000;
  const MIN = 0;
  const RELATIVE = 100000;

  // Cumulative
  const dates = [];
  const cases = [];
  const deaths = [];
  const recovered = [];

  if (data) {
    if (data.dates) data.dates.forEach((el) => dates.push(el));
    data.cases.forEach((el) => cases.push(el));
    data.deaths.forEach((el) => deaths.push(el));
    data.recovered.forEach((el) => recovered.push(el));
  }

  // Each Day
  const casesDay = createDataArrayForEachDay(cases).filter((el) => el < MAX && el >= MIN);
  const deathsDay = createDataArrayForEachDay(deaths).filter((el) => el >= MIN);
  const recoveredDay = createDataArrayForEachDay(recovered).filter((el) => el >= MIN && el < MAX);

  // Relative Cumulative
  const casesRelative = cases.map((el) => ((el / data.population) * RELATIVE).toFixed(2));
  const deathsRelative = deaths.map((el) => ((el / data.population) * RELATIVE).toFixed(2));
  const recoveredRelative = recovered.map((el) => ((el / data.population) * RELATIVE).toFixed(2));

  // Relative Each Day
  const casesRelativeDay = casesDay.map((el) => ((el / data.population) * RELATIVE).toFixed(2));
  const deathsRelativeDay = deathsDay.map((el) => ((el / data.population) * RELATIVE).toFixed(2));
  const recoveredRelativeDay = recoveredDay.map((el) => ((el / data.population) * RELATIVE).toFixed(2));

  return {
    dates,
    cases,
    deaths,
    recovered,
    casesDay,
    deathsDay,
    recoveredDay,
    casesRelative,
    deathsRelative,
    recoveredRelative,
    casesRelativeDay,
    deathsRelativeDay,
    recoveredRelativeDay,
  };
};

async function getGlobalData() {
  const data = await store.getHistoricalGlobalRates();
  return getData(data);
}

async function getDataForCountry(country) {
  const data = await store.getRatesForEachCountry(country);
  return getData(data);
}

const changeChartToCases = (config, chart, country = 'Global') => {
  config.backgroundColor = 'rgba(234,28,36,0.6)';
  config.label = `Cases ${country}`;
  chart.config.type = 'bar';
  chart.update();
};

const changeChartToDeaths = (config, chart, country = 'Global') => {
  config.backgroundColor = 'white';
  config.label = `Deaths ${country}`;
  chart.config.type = 'bar';
  chart.update();
};

const changeChartToRecovered = (config, chart, country = 'Global') => {
  config.backgroundColor = 'green';
  config.label = `Recovered ${country}`;
  chart.config.type = 'bar';
  chart.update();
};

const updateDataForChart = (config, chart, data, country = 'Global') => {
  // Absolute
  if (timeChoice1.checked && allCases.checked && rangeChoice1.checked) {
    config.data = data.cases;
    changeChartToCases(config, chart, country);
  }
  if (timeChoice1.checked && allDeaths.checked && rangeChoice1.checked) {
    config.data = data.deaths;
    changeChartToDeaths(config, chart, country);
  }
  if (timeChoice1.checked && allRecovered.checked && rangeChoice1.checked) {
    config.data = data.recovered;
    changeChartToRecovered(config, chart, country);
  }
  if (timeChoice2.checked && allCases.checked && rangeChoice1.checked) {
    config.data = data.casesDay;
    changeChartToCases(config, chart, country);
  }
  if (timeChoice2.checked && allDeaths.checked && rangeChoice1.checked) {
    config.data = data.deathsDay;
    changeChartToDeaths(config, chart, country);
  }
  if (timeChoice2.checked && allRecovered.checked && rangeChoice1.checked) {
    config.data = data.recoveredDay;
    changeChartToRecovered(config, chart, country);
  }

  // Relative
  if (timeChoice1.checked && allCases.checked && rangeChoice2.checked) {
    config.data = data.casesRelative;
    changeChartToCases(config, chart, country);
  }
  if (timeChoice1.checked && allDeaths.checked && rangeChoice2.checked) {
    config.data = data.deathsRelative;
    changeChartToDeaths(config, chart, country);
  }
  if (timeChoice1.checked && allRecovered.checked && rangeChoice2.checked) {
    config.data = data.recoveredRelative;
    changeChartToRecovered(config, chart, country);
  }
  if (timeChoice2.checked && allCases.checked && rangeChoice2.checked) {
    config.data = data.casesRelativeDay;
    changeChartToCases(config, chart, country);
  }
  if (timeChoice2.checked && allDeaths.checked && rangeChoice2.checked) {
    config.data = data.deathsRelativeDay;
    changeChartToDeaths(config, chart, country);
  }
  if (timeChoice2.checked && allRecovered.checked && rangeChoice2.checked) {
    config.data = data.recoveredRelativeDay;
    changeChartToRecovered(config, chart, country);
  }
};

async function changeChartToGlobalData(config, chart) {
  const globalData = await getGlobalData();
  updateDataForChart(config, chart, globalData);
}

async function changeChartToEachCountry(country, config, chart) {
  const data = await getDataForCountry(country);
  updateDataForChart(config, chart, data, country);
}

async function createChart() {
  const chartWrapper = document.getElementById('chart').getContext('2d');
  const globalData = await getGlobalData();
  const chartConfig = {
    type: 'bar',
    data: {
      labels: globalData.dates,
      datasets: [{
        label: 'Cases',
        data: globalData.cases,
        backgroundColor: 'rgba(234,28,36,0.6)',
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        yAxes: [{
          beginAtZero: true,
          gridLines: {
            color: 'rgba(218, 218, 218, 0.21)',
          },
          ticks: {
            callback(value, index) {
              if (index % 1 === 0) return `${Math.trunc(value / 1000)}k`;
            },
            fontColor: 'rgba(218, 218, 218, 0.80)',
            fontFamily: 'Bebas Neue',
            fontSize: 12,
          },
        }],
        xAxes: [{
          type: 'time',
          position: 'bottom',
          time: {
            tooltipFormat: 'DD/MM/YY',
            unit: 'month',
            stepSize: 2,
          },
          gridLines: {
            color: 'rgba(218, 218, 218, 0.21)',
            borderDash: [10],
          },
          ticks: {
            fontColor: 'rgba(218, 218, 218, 0.80)',
            fontFamily: 'Bebas Neue',
            fontSize: 12,
          },
        }],
      },
      legend: {
        display: false,
        labels: {
          fontColor: 'white',
          fontSize: 18,
        },
      },

    },
  };
  const chart = new Chart(chartWrapper, chartConfig);
  const config = chart.config.data.datasets[0];
  const input = document.querySelector('.search-input');

  let country; 

  input.addEventListener('input', () => {
    if (!input.value) changeChartToGlobalData(config, chart);
  });

  document.body.addEventListener('click', () => {
    country = state.getCurrentCountryName();
    if (state.isGlobal && !country || country === 'Global') {
      changeChartToGlobalData(config, chart);
    } else {
      changeChartToEachCountry(`${country}`, config, chart);
    }
  });
  return chart;
}

export default createChart;
