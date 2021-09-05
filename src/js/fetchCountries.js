export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.baseUrl = 'https://restcountries.eu/rest/v2/';
  }

  searchCountryByName() {
    const url = `${this.baseUrl}name/${this.searchQuery}`;

    if (!this.searchQuery) {
      return undefined;
    }

    return fetch(url).then(reply => {
      if (reply.ok) {
        return reply.json();
      }

      throw new Error('Error');
    });
  }
}
