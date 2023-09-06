import axios from "axios";

function fetchBreeds() {
   return axios.get('https://api.thecatapi.com/v1/breeds')
}


function fetchCatByBreed(breedId) {
   return axios.get('https://api.thecatapi.com/v1/images/search', {
    params: {
        breed_ids: breedId
    }
  })
}
export {fetchBreeds,fetchCatByBreed};