import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

axios.defaults.headers.common['x-api-key'] = 'live_JHnJAubVcPsRMfv1BUBfy0QaVlQy1zufDd0AvcgvmDRIL8K13ScPPc4e1DGheqLf';



const loaderStyles = `
  width: 48px;
  height: 48px;
  border: 5px solid #FFF;
  border-bottom-color: #FF3D00;
  border-radius: 50%;
  display: none;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
`;

const keyframes = `
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function showError() {
  const error = document.querySelector('.error');
  error.classList.remove('hidden');

  Notiflix.Notify.Failure('Failed to fetch cat');
}

function hideError() {
  const error = document.querySelector('.error');
  error.classList.add('hidden');
}

function handleBreedSelectChange(event) {
  const breedId = event.target.value;

  if (breedId) {
    showLoader();
    hideError();

    fetchCatByBreed(breedId)
      .then((cat) => {
        updateCatInfo(cat[0]);
      })
      .catch(() => {
        showError();
      })
      .finally(() => {
        hideLoader();
      });
  } else {
    const catInfo = document.querySelector('.cat-info');
    catInfo.classList.add('hidden');
  }
}

function initApp() {
  fetchBreeds()
    .then((breeds) => {
      updateBreedSelect(breeds);
      hideLoader();
    })
    .catch(() => {
      showError();
      hideLoader();
    });

    const breedSelect = document.querySelector('.breed-select');
  breedSelect.addEventListener('change', handleBreedSelectChange);
}

function fetchBreeds() {
  showLoader();

  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then((response) => response.data)
    .catch((error) => {
      showError();
      throw new Error(`Failed to fetch breeds: ${error.message}`);
    });
}

function fetchCatByBreed(breedId) {
  showLoader();

  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      showError();
      throw new Error(`Failed to fetch cat: ${error.message}`);
    });
}

function updateBreedSelect(breeds) {
  const breedSelect = document.querySelector('.breed-select');

  breeds.forEach((breed) => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
  });
}

function updateCatInfo(cat) {
  const catInfo = document.querySelector('.cat-info');
  catInfo.innerHTML = `
    <img src="${cat.url}" alt="Cat Image" width="400" height="250" />
    <h2>${cat.breeds[0].name}</h2>
    <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
  `;
  catInfo.classList.remove('hidden');
}

function showLoader() {
  const loader = document.querySelector('.loader');
    loader.style.display = 'inline-block';
    loader.textContent ="";
}

function hideLoader() {
  const loader = document.querySelector('.loader');
    loader.style.display = 'none';
    
}

document.addEventListener('DOMContentLoaded', initApp);

const style = document.createElement('style');
style.textContent = `
  .loader {
    ${loaderStyles}
  }

  ${keyframes}
`;
document.head.appendChild(style);
