import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const perPages = 40; 
const KEY = '33017005-3089560dbf89e85a2a48421c2';
const URL = 'https://pixabay.com/api/';

export default async function loadImages(imageName, page, creatMurkup, buttonMore) {
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
        galleryImg.refresh();
        
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