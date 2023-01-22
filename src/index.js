import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const buttonMore = document.querySelector('.load-more');

const KEY = '33017005-3089560dbf89e85a2a48421c2';
const URL = 'https://pixabay.com/api/';

formEl.addEventListener('submit', onSearchImage);

function onSearchImage(evt) {
    evt.preventDefault();

    let imageName = '';
    gallery.innerHTML = '';

    imageName = evt.currentTarget.elements.searchQuery.value;
    let page = 1;

    loadImages();

    buttonMore.addEventListener('click', onLoadMore);

  function onLoadMore() {
      page+=1;
      console.log(page);
      loadImages();
    }

  async function loadImages() {
      try {
        const responses = await axios.get(`${URL}?key=${KEY}&q=${imageName}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);

        const cardArr = responses.data.hits;
        if(page === responses.data.totalHits % 40) {
          buttonMore.classList.add('is-hidden');
        }

        if(cardArr.length === 0) {
          Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
        
        creatMurkup(cardArr);
        buttonMore.classList.remove('is-hidden'); 
} catch(err){
    console.log(err);
}
    }
}


function creatMurkup(arrey) {
    const cards = arrey.map(({ 
        webformatURL, 
        largeImageURL, 
        tags, 
        likes, 
        views, 
        comments,
        downloads
    }) => {
        return murkup = `
        <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
    }).join('');

    gallery.insertAdjacentHTML("beforeend", cards);
}

