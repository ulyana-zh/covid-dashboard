const regeneratorRuntime = require('regenerator-runtime');

const chartWrapper = document.getElementById('chart').getContext('2d');

async function getData() {
  const dateX = [];
  const caseY = [];
  const deathsY = [];
  const recoveredY = [];

  const url = 'https://disease.sh/v3/covid-19/historical/all?lastdays=366';
  const response = await fetch(url);
  const data = await response.json();

  const dates = Object.keys(Object.values(data)[0]);
  const cases = Object.values(Object.values(data)[0]);
  const deaths = Object.values(Object.values(data)[1]);
  const recovered = Object.values(Object.values(data)[2]);

  dates.forEach((date) => {
    dateX.push(date);
  });

  cases.forEach((elem) => {
    caseY.push(elem);
  });

  deaths.forEach((death) => {
    deathsY.push(death);
  });

  recovered.forEach((recovering) => {
    recoveredY.push(recovering);
  });

  return {
    dateX, caseY, deathsY, recoveredY,
  };
}

async function createChart() {
  const data = await getData();
  const chart = new Chart(chartWrapper, {
    type: 'bar',
    scaleFontColor: 'red',
    data: {
      labels: data.dateX,
      datasets: [{
        label: 'Cases',
        data: data.caseY,
        fill: false,
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
            callback(value, index, values) {
              if (index % 2 === 0) return `${value / 100000}m`;
            },
            fontColor: 'rgba(218, 218, 218, 0.80)',
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
            display: false,
          },
          ticks: {
            fontColor: 'rgba(218, 218, 218, 0.80)',
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
  });

  const config = chart.config.data.datasets[0];

  document.getElementById('all-deaths').addEventListener('click', () => {
    config.data = data.deathsY;
    config.backgroundColor = 'white';
    config.label = 'Deaths';
    chart.update();
  });

  document.getElementById('all-recovered').addEventListener('click', () => {
    config.data = data.recoveredY;
    config.backgroundColor = 'green';
    config.label = 'Recovered';
    // chart.config.type = 'line';
    chart.update();
  });

  document.getElementById('all-cases').addEventListener('click', () => {
    config.data = data.caseY;
    config.backgroundColor = 'rgba(234,28,36,0.6)';
    config.label = 'Cases';
    chart.config.type = 'bar';
    chart.update();
  });

  return chart;
}

export { createChart };
