import '../../sass/table/table.css';

function renderTable() {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-values-wrapper');

  tableWrapper.innerHTML = '<div class="table-content">'
        + '   <div class="table-content__name table-cell"><span id="tableArea">-</span></div>'
        + '   <div class="table-content__cases table-cell"><span>Cases:</span><span id="tableCases">-</span></div>'
        + '   <div style="color: red;" class="table-content__deaths table-cell"><span>Deaths:</span><span id="tableDeaths">-</span></div>'
        + '   <div style="color: green;" class="table-content__recovered table-cell"><span>Recovered:</span><span id="tableRecovered">-</span></div>'
        + '</div>';

  return tableWrapper;
}

export default renderTable;
