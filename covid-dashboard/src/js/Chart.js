const regeneratorRuntime = require('regenerator-runtime');

const chartWrapper = document.getElementById('chart').getContext('2d');

async function getData() {
  const dateX = [];
  const caseY = [];

  const url = 'https://disease.sh/v3/covid-19/historical/all?lastdays=366';
  const response = await fetch(url);
  const data = await response.json();

  const cases = Object.values(Object.values(data)[0]);
  const dates = Object.keys(Object.values(data)[0]);

  dates.forEach((date) => {
    dateX.push(date);
  });

  cases.forEach((elem) => {
    caseY.push(elem);
  });

  return { dateX, caseY };
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
        backgroundColor: 'rgba(255, 99, 132, 0.9)',
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
        labels: {
          fontColor: 'white',
          fontSize: 18,
        },
      },

    },
  });
  return chart;
}

export default createChart;
