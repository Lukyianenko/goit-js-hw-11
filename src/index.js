import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const buttonMore = document.querySelector('.load-more');
const perPages = 40; 

const KEY = '33017005-3089560dbf89e85a2a48421c2';
const URL = 'https://pixabay.com/api/';
let imageName = '';
let page = 1;

formEl.addEventListener('submit', onSearchImage);


function onSearchImage(evt) {
    evt.preventDefault();

    imageName = '';
    gallery.innerHTML = '';
    page = 1;
   
    imageName = evt.currentTarget.elements.searchQuery.value;
    evt.currentTarget.elements.searchQuery.value = '';

    loadImages();

    buttonMore.addEventListener('click', loadImages);

  async function loadImages() {
      try {
        const responses = await axios.get(`${URL}?key=${KEY}&q=${imageName}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPages}`);

        const cardArr = responses.data.hits;

        if(page === 1 && cardArr.length !== 0) {
          Notify.success(`Hooray! We found ${responses.data.totalHits} images.`);
        }
        
        page+=1;

        if(cardArr.length === 0) {
          Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
        
        creatMurkup(cardArr);
        var galleryImg = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: 250});

        buttonMore.classList.remove('is-hidden'); 
        const pages = ( responses.data.totalHits - responses.data.totalHits % perPages ) / perPages + 2;

        if(page ===  pages) {
          buttonMore.classList.add('is-hidden');
          Notify.info("We're sorry, but you've reached the end of search results.");
        }
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
        <a href="${largeImageURL}">
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
</div>
</a>`
    }).join('');

    gallery.insertAdjacentHTML("beforeend", cards);
}

