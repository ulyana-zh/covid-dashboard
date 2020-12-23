const selects = {
  selectList: document.querySelector('.list__select'),
  selectMap: document.querySelector('.select-map'),
};

const { selectList, selectMap } = selects;

const changeSelectMap = (rate) => {
  selectMap.value = rate;
  selectMap.dispatchEvent(new Event('change'));
};

const changeSelectList = (rate) => {
  selectList.value = rate;
  selectMap.dispatchEvent(new Event('change'));
};

const addEventListenersToSelects = () => {
  selectList.addEventListener('click', () => {
    if (selectList.value === 'cases') {
      changeSelectMap('cases');
      allCases.checked = true;
    }
    if (selectList.value === 'deaths') {
      changeSelectMap('deaths');
      allDeaths.checked = true;
    }
    if (selectList.value === 'recovered') {
      changeSelectMap('recovered');
      allRecovered.checked = true;
    }
  });

  selectMap.addEventListener('click', () => {
    if (selectMap.value === 'cases') {
      changeSelectList('cases');
      allCases.checked = true;
    }
    if (selectMap.value === 'deaths') {
      changeSelectList('deaths');
      allDeaths.checked = true;
    }
    if (selectMap.value === 'recovered') {
      changeSelectList('recovered');
      allRecovered.checked = true;
    }
  });

  document.querySelector('#allCases').addEventListener('click', () => {
    changeSelectList('cases');
    changeSelectMap('cases');
  });

  document.querySelector('#allDeaths').addEventListener('click', () => {
    changeSelectList('deaths');
    changeSelectMap('deaths');
  });

  document.querySelector('#allRecovered').addEventListener('click', () => {
    changeSelectList('recovered');
    changeSelectMap('recovered');
  });
};

export default addEventListenersToSelects;
