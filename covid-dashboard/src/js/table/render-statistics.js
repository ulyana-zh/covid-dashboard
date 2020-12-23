const modifyNumberValue = require('../common-functions/modifyNumberValue');

function renderStatistics(statistics) {
  tableArea.textContent = statistics.area;
  tableCases.textContent = modifyNumberValue(statistics.cases);
  tableDeaths.textContent = modifyNumberValue(statistics.deaths);
  tableRecovered.textContent = modifyNumberValue(statistics.recovered);
}

export default renderStatistics;
