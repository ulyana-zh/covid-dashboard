const state = {
  isGlobal: true,
  currentCountry: null,
  currentListMode: 'cases',
  searchValue: '',
  currentList: null,

  //  получить данные для всех стран из стора
  //  отсортировать согласно текущему моду
  //  отдать массив соответствующий поисковому запросу

  // getDataFromStore() {
  //   store.getAllCountriesData().then(() => {
  //     ;
  //   });
  // }
};

export default state;
