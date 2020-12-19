import renderTable from './render-table';
import renderModesContainer from './render-modes-container';
import renderStatistics from './render-statistics';
import store from '../store';

function renderTableBlock() {
    const tableContainer = document.querySelector('#table-container')
    tableContainer.append(renderTable(), renderModesContainer());

    store.getGlobalData().then((data) => {
        renderStatistics(data)
    })
}

export default renderTableBlock;
