const state = {
  isGlobal: true,
  currentCountry: null,
  currentCountryName: null,
  currentListMode: 'cases',
  searchValue: '',
  searchedList: null,
  currentList: null,
  allCountriesList: null,

  getCurrentCountryName() {
    return this.currentCountryName;
  },
};

export default state;
