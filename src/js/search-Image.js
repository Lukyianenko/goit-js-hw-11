import axios from "axios";

const perPages = 40; 
const KEY = '33017005-3089560dbf89e85a2a48421c2';
const URL = 'https://pixabay.com/api/';

export default async function loadImages(imageName, page) {
    try {
        return await axios.get(`${URL}?key=${KEY}&q=${imageName}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPages}`);

} catch(err) {
  console.log(err);
}
}