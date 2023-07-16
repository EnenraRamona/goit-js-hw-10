import axios from "axios";

const apiKey = "live_JHnJAubVcPsRMfv1BUBfy0QaVlQy1zufDd0AvcgvmDRIL8K13ScPPc4e1DGheqLf";
axios.defaults.headers.common["x-api-key"] = apiKey;

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds").then((response) => response.data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => response.data);
}
