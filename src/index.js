import axios from "axios";

const formEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

const KEY = '33017005-3089560dbf89e85a2a48421c2';
const URL = 'https://pixabay.com/api/';

formEl.addEventListener('submit', onSearchImage);

async function onSearchImage(evt) {
    evt.preventDefault();

    const imageName = evt.currentTarget.elements.searchQuery.value;
    try { 
        const responses = await axios.get(`${URL}?key=${KEY}&q=${imageName}&image_type=photo&orientation=horizontal&safesearch=true`);
        const cardArr = responses.data.hits;

        creatMurkup(cardArr);
} catch(err){
    console.log(err);
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

    gallery.innerHTML = cards;
}

