import './sass/main.scss';
import countryMarkup from './templates/article-tpl'
import countriesList from './templates/countries-list-tpl'
import debounce from 'lodash.debounce';
import { alert, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import ApiService from './js/fetchCountries';
import '@pnotify/core/dist/BrightTheme.css';

//refs
const container = document.querySelector('#root'); 
const countrySearch = document.querySelector('#input');
const searchResult=document.querySelector('#result');
countrySearch.addEventListener('input', debounce(handlerSearch, 500));

const countriesApiService = new ApiService();

//functions
function handlerSearch(e) {
  e.preventDefault();

  countriesApiService.searchQuery= countrySearch.value;
  
  countriesApiService
    .searchCountryByName(countriesApiService.searchQuery)
    .then(countries => createCountryCard(countries))
    .catch(err => errorCase(err));
}


function renderMarkup(template, countries) {
  searchResult.insertAdjacentHTML('beforeend', template(countries))
}



function createCountryCard(countries) {
  searchResult.innerHTML = '';
  if (countries.length < 10 && countries.length > 1) {
    renderMarkup(countriesList, countries);
} else if (countries.length === 1) {
    renderMarkup(countryMarkup, countries);
  } else if (countries.length > 10) {
    alert({
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 2000,
    });
} 
  
}

function errorCase() { 
  error({
    text: 'This country does not exist! Please, check the name and try again',
    delay: 2000,
  })
  
}
