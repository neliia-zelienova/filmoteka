import 'normalize.css';

import './main.scss';
import './styles.css';
import './js/footerModal';
import { DataProccessing, getGenresList } from './js/apiServices';
import createCards from './js/createCards';
import refs from './js/refs';
import spinner from './js/utils/spiner';
import './js/myLibrary';
import _ from 'lodash';
import './js/add-to-watch.js';
import './js/add-to-favorite.js';
import toPaginate from './js/toPaginate';

// дожлен быть только один объект для всех запросов

const dataProccessing = new DataProccessing();

// для деплоя /filmoteka/ и /filmoteka/index.html или /filmoteka/myLib.html
if (location.pathname === '/index.html' || location.pathname === '/') {
  getHomePage();
}
let pageNumber;
function getHomePage() {
  spinner.spin(refs.target);
  dataProccessing.getPopular().then(data => {
    // createCards(data);
pageNumber=dataProccessing.getAppPages;
    toPaginate(data);
    console.dir(data);
  });
}

const searchFilm = function (event) {
  spinner.spin(refs.target);
  event.preventDefault();
  dataProccessing.keywordSearch(refs.searchInput.value).then(data => {
    // createCards(data);
    toPaginate(data);
    spinner.stop();
  });
};

if (location.pathname === '/index.html' || location.pathname === '/') {
  refs.searchForm.addEventListener('submit', searchFilm);
  refs.searchInput.addEventListener('input', _.debounce(searchFilm, 1000));
}
console.log(pageNumber);
export { pageNumber};