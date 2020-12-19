function renderStatistics(statistics) {
  tableArea.textContent = statistics.area;
  tableCases.textContent = statistics.cases;
  tableDeaths.textContent = statistics.deaths;
  tableRecovered.textContent = statistics.recovered;
}

export default renderStatistics;
