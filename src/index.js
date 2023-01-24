import loadImages from './js/search-Image'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const buttonMore = document.querySelector('.load-more');
const perPages = 40; 

let imageName = '';
let page = 1;

formEl.addEventListener('submit', onSearchImage);
buttonMore.addEventListener('click', onLoadImage);

function onLoadImage() {
  loadImages(imageName, page).then(responses => { 
    const cardArr = responses.data.hits;
  console.log(cardArr);

    if(page === 1 && cardArr.length !== 0) {
      Notify.success(`Hooray! We found ${responses.data.totalHits} images.`);
    }
    
    page+=1;

    if(cardArr.length === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    
    creatMurkup(cardArr);
    
    var galleryImg = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: 250});
    galleryImg.refresh();
    
    buttonMore.classList.remove('is-hidden'); 
    const pages = ( responses.data.totalHits - responses.data.totalHits % perPages ) / perPages + 2;

    if(page ===  pages) {
      buttonMore.classList.add('is-hidden');
      if(cardArr.length !== 0) {
        Notify.info("We're sorry, but you've reached the end of search results.");
      }
    }
  });
}

function onSearchImage(evt) {
    evt.preventDefault();

    imageName = '';
    gallery.innerHTML = '';
    page = 1;
   
    imageName = evt.currentTarget.elements.searchQuery.value.trim();

    if(imageName === '') {
      return
    }
    evt.currentTarget.elements.searchQuery.value = '';

    onLoadImage();

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
        return `
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

