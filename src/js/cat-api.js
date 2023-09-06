import axios from "axios";

const BASE_URL = "https://api.thecatapi.com/v1"

export function fetchBreeds() {
   return axios.get(`${BASE_URL}/breeds`)
}


export function fetchCatByBreed(breedId) {
   return axios.get(`${BASE_URL}/images/search`, {
    params: {
        breed_ids: breedId
    }
  })
}
