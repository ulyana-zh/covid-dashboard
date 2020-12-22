import store from './store';

const regeneratorRuntime = require('regenerator-runtime');

const createDataArrayForEachDay = (data) => {
  const targetArray = [];
  for (let i = 0; i < data.length - 1; i++) {
    targetArray[i] = data[i + 1] - data[i];
  }
  return targetArray;
};

async function getGlobalData() {
  const MAX = 1000000;

  // Cumulative
  const dates = [];
  const cases = [];
  const deaths = [];
  const recovered = [];

  const data = await store.getHistoricalGlobalRates();

  data.dates.forEach((el) => dates.push(el));
  data.cases.forEach((el) => cases.push(el));
  data.deaths.forEach((el) => deaths.push(el));
  data.recovered.forEach((el) => recovered.push(el));

  // Each Day
  const casesDay = createDataArrayForEachDay(cases).filter((el) => el < MAX);
  const deathsDay = createDataArrayForEachDay(deaths);
  const recoveredDay = createDataArrayForEachDay(recovered).filter((el) => el > 0 && el < MAX);

  return {
    dates, cases, deaths, recovered, casesDay, deathsDay, recoveredDay,
  };
}

async function getDataForCountry(country) {
  
  // Cumulative
  const cases = [];
  const deaths = [];
  const recovered = [];

  const data = await store.getRatesForEachCountry(country);

  data.cases.forEach((el) => cases.push(el));
  data.deaths.forEach((death) => deaths.push(death));
  data.recovered.forEach((recover) => recovered.push(recover));

  // Each day
  const casesDay = createDataArrayForEachDay(cases);
  const deathsDay = createDataArrayForEachDay(deaths);
  const recoveredDay = createDataArrayForEachDay(recovered);

  return {
    cases, deaths, recovered, casesDay, deathsDay, recoveredDay,
  };
}

const changeChartToCases = (config, chart) => {
  config.backgroundColor = 'rgba(234,28,36,0.6)';
  config.label = 'Cases';
  chart.config.type = 'bar';
  chart.update();
};

const changeChartToDeaths = (config, chart) => {
  config.backgroundColor = 'white';
  config.label = 'Deaths';
  chart.config.type = 'bar';
  chart.update();
};

const changeChartToRecovered = (config, chart) => {
  config.backgroundColor = 'green';
  config.label = 'Recovered';
  chart.config.type = 'bar';
  chart.update();
};

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
              if (index % 1 === 0) return `${value / 100000}m`;
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
  changeChartToGlobalData(config, chart);

  return chart;
}

async function changeChartToGlobalData(config, chart) {
  const globalData = await getGlobalData();
  const inputs = document.querySelector('main');

  inputs.querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', () => {
      if (timeChoice1.checked && allCases.checked) {
        config.data = globalData.cases;
        changeChartToCases(config, chart);
      }
      if (timeChoice1.checked && allDeaths.checked) {
        config.data = globalData.deaths;
        changeChartToDeaths(config, chart);
      }
      if (timeChoice1.checked && allRecovered.checked) {
        config.data = globalData.recovered;
        changeChartToRecovered(config, chart);
      }
      if (timeChoice2.checked && allCases.checked) {
        config.data = globalData.casesDay;
        changeChartToCases(config, chart);
      }
      if (timeChoice2.checked && allDeaths.checked) {
        config.data = globalData.deathsDay;
        changeChartToDeaths(config, chart);
      }
      if (timeChoice2.checked && allRecovered.checked) {
        config.data = globalData.recoveredDay;
        changeChartToRecovered(config, chart);
      }
    });
  });
}

async function changeChartToEachCountry(country) {
  const data = await getDataForCountry(country);

  const inputs = document.querySelector('main');

  inputs.querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', () => {
      if (timeChoice1.checked && data.checked) {
        config.data = data.cases;
        changeChartToCases(config, chart);
      }
      if (timeChoice1.checked && allDeaths.checked) {
        config.data = data.deaths;
        changeChartToDeaths(config, chart);
      }
      if (timeChoice1.checked && allRecovered.checked) {
        config.data = data.recovered;
        changeChartToRecovered(config, chart);
      }
      if (timeChoice2.checked && allCases.checked) {
        config.data = data.casesDay;
        changeChartToCases(config, chart);
      }
      if (timeChoice2.checked && allDeaths.checked) {
        config.data = data.deathsDay;
        changeChartToDeaths(config, chart);
      }
      if (timeChoice2.checked && allRecovered.checked) {
        config.data = data.recoveredDay;
        changeChartToRecovered(config, chart);
      }
    });
  });
}

export { createChart };
