const URL_GLOBAL = 'https://disease.sh/v3/covid-19/all';
const URL_COUNTRIES = 'https://disease.sh/v3/covid-19/countries';
const URL_COUNTRY = 'https://api.covid19api.com/total/country/';
const RELATIVE_NUMBER = 100000;
const MILLISECONDS_OF_ONE_DAY = 86400000;

const store = {
  async _sendRequest(url) {
    const response = await fetch(url);
    return response.json();
  },

  _initModeForData(data, type) {
    switch (type) {
      case 'ALL-TIME':
        return {
          area: data.country ? data.country : 'Global',
          cases: data.cases,
          deaths: data.deaths,
          recovered: data.recovered,
        };

      case 'TODAY':
        return {
          area: data.country ? data.country : 'Global',
          cases: data.todayCases,
          deaths: data.todayDeaths,
          recovered: data.todayRecovered,
        };

      case 'RELATIVE-ALL-TIME':
        return {
          area: data.country ? data.country : 'Global',
          cases: Number((data.casesPerOneMillion / 10).toFixed(3)),
          deaths: Number((data.deathsPerOneMillion / 10).toFixed(3)),
          recovered: Number((data.recoveredPerOneMillion / 10).toFixed(3)),
        };

      case 'RELATIVE-TODAY':
        return {
          area: data.country ? data.country : 'Global',
          cases: Number((data.todayCases * RELATIVE_NUMBER / data.population).toFixed(3)),
          deaths: Number((data.todayDeaths * RELATIVE_NUMBER / data.population).toFixed(3)),
          recovered: Number((data.todayRecovered * RELATIVE_NUMBER / data.population).toFixed(3)),
        };
    }
  },

  _getDataForGlobal(url, type) {
    return this._sendRequest(url).then((data) => this._initModeForData(data, type));
  },

  _getDataForCountry(id) {
    return this._sendRequest(URL_COUNTRIES).then((data) => data.find((country) => country.countryInfo.iso3 === id));
  },

  //  ИНТЕРФЕЙС ОБЪЕКТА STORE
  //
  //  Все методы (кроме .getCountryFlagUrl и .getCountryCoordinates) возвращают объект с полями:
  //  * cases
  //  * deaths
  //  * recovered
  //
  //  id для страны является строка со значением iso3 этой страны

  getGlobalData() { // возвращает промис с мировой статистикой за все время
    return this._getDataForGlobal(URL_GLOBAL, 'ALL-TIME');
  },

  getGlobalTodayData() { // возвращает промис с мировой статистикой за сегодня
    return this._getDataForGlobal(URL_GLOBAL, 'TODAY');
  },

  getGlobalRelativeData() { // возвращает промис с мировой статистикой за все время на 100 000
    return this._getDataForGlobal(URL_GLOBAL, 'RELATIVE-ALL-TIME');
  },

  getGlobalTodayRelativeData() { // возвращает промис с мировой статистикой за сегодня на 100 000
    return this._getDataForGlobal(URL_GLOBAL, 'RELATIVE-TODAY');
  },

  getAllCountriesData() {
    return this._sendRequest(URL_COUNTRIES).then((data) => data.map((country) => (
      {
        id: country.countryInfo.iso3,
        area: country.country,
        cases: country.cases,
        deaths: country.deaths,
        recovered: country.recovered,
        flag: country.countryInfo.flag,
      }
    )));
  },

  async getCountryData(id) { // возвращает промис со статистикой конкретной страны за все время
    return this._initModeForData(await this._getDataForCountry(id), 'ALL-TIME');
  },

  async getCountryTodayData(id) { // возвращает промис со статистикой конкретной страны за сегодня
    return this._initModeForData(await this._getDataForCountry(id), 'TODAY');
  },

  async getCountryRelativeData(id) { // возвращает промис со статистикой конкретной страны за все время на 100 000
    return this._initModeForData(await this._getDataForCountry(id), 'RELATIVE-ALL-TIME');
  },

  async getCountryTodayRelativeData(id) { // возвращает промис со статистикой конкретной страны за сегодня на 100 000
    return this._initModeForData(await this._getDataForCountry(id), 'RELATIVE-TODAY');
  },

  getCountryFlagUrl(id) { // возвращает промис с url-адресом флага конкретной страны
    return this._getDataForCountry(id).then((data) => data.countryInfo.flag);
  },

  getCountryCoordinates(id) { // возвращает промис с координатами конкретной страны
    return this._getDataForCountry(id).then((data) => ({
      lat: data.countryInfo.lat,
      long: data.countryInfo.long,
    }));
  },

  getHistoricalGlobalData() { // возвращает промис с архивными данными начиная с 15 апреля 2020
    const startPointDate = new Date('2020-04-15T00:00:00');
    const todayDate = new Date();

    const daysCount = Math.floor((todayDate.getTime() - startPointDate.getTime()) / MILLISECONDS_OF_ONE_DAY);
    const url = `https://disease.sh/v3/covid-19/historical/all?lastdays=${daysCount}`;

    return fetch(url).then((response) => response.json());
  },

  getHistoricalGlobalRates() {
    return this.getHistoricalGlobalData().then((data) => ({
      dates: Object.keys(data.cases),
      cases: Object.values(data.cases),
      deaths: Object.values(data.deaths),
      recovered: Object.values(data.recovered),
    }));
  },

  getAllRatesForEachCountry(country) {
    const startPointDate = new Date('2020-04-15T00:00:00');

    const url = `${URL_COUNTRY}${country}`;
    return fetch(url).then((response) => response.json()).then((data) => data.filter((country) => new Date(country.Date) > startPointDate).sort());
  },

  getRatesForEachCountry(country) {
    return this.getAllRatesForEachCountry(country).then((data) => ({
      cases: data.map((country) => country.Confirmed),
      deaths: data.map((country) => country.Deaths),
      recovered: data.map((country) => country.Recovered),
    }));
  },
};

export default store;
