import store from '../store';
import state from '../state';
import renderStatistics from './render-statistics';
import '../../sass/table/table.css';

function renderModesContainer() {
  const modesWrapper = document.createElement('div');
  modesWrapper.classList.add('modes-wrapper');

  modesWrapper.innerHTML =
          '<div class="modes-wrapper__cell">'
        + '   <p>Time period:</p>'
        + '   <div>'
        + '       <input type="radio" id="timeChoice1" name="time" value="allTime" checked>'
        + '       <label for="timeChoice1">All time</label>'
        + ''
        + '       <input style="margin-left: 10px;" type="radio" id="timeChoice2" name="time" value="today">'
        + '       <label for="timeChoice2">Today</label>'
        + '   </div>'
        + '</div>'
        + ''
        + '<div class="modes-wrapper__cell" style="margin-left: 20px;">'
        + '   <p>Range of values:</p>'
        + '   <div>'
        + '       <input type="radio" id="rangeChoice1" name="range" value="absolute" checked>'
        + '       <label for="rangeChoice1">Absolute</label>'
        + ''
        + '       <input style="margin-left: 10px;" type="radio" id="rangeChoice2" name="range" value="relative">'
        + '       <label for="rangeChoice2">Relative</label>'
        + '   </div>'
        + '</div>';

  modesWrapper.querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', () => {
      switch (state.isGlobal) {
        case true:
          if (timeChoice1.checked && rangeChoice1.checked) {
            store.getGlobalData().then((data) => renderStatistics(data));
          }
          if (timeChoice1.checked && rangeChoice2.checked) {
            store.getGlobalRelativeData().then((data) => renderStatistics(data));
          }
          if (timeChoice2.checked && rangeChoice1.checked) {
            store.getGlobalTodayData().then((data) => renderStatistics(data));
          }
          if (timeChoice2.checked && rangeChoice2.checked) {
            store.getGlobalTodayRelativeData().then((data) => renderStatistics(data));
          }
          break;
        case false:
          if (timeChoice1.checked && rangeChoice1.checked) {
            store.getCountryData(state.currentCountry).then((data) => renderStatistics(data));
          }
          if (timeChoice1.checked && rangeChoice2.checked) {
            store.getCountryRelativeData(state.currentCountry).then((data) => renderStatistics(data));
          }
          if (timeChoice2.checked && rangeChoice1.checked) {
            store.getCountryTodayData(state.currentCountry).then((data) => renderStatistics(data));
          }
          if (timeChoice2.checked && rangeChoice2.checked) {
            store.getCountryTodayRelativeData(state.currentCountry).then((data) => renderStatistics(data));
          }
      }
    })
  })

  return modesWrapper;
}

export default renderModesContainer;
