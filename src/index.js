import { Notify } from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './js/cat_api';
import SlimSelect from 'slim-select'



const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderContainer = document.querySelector('.loader-container');


function populateBreedSelect(breeds) {
  breeds.forEach((breed) => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}


function displayCatInfo(catData) {
  const catImage = document.createElement('img');
  catImage.src = catData[0].url;
  const catName = document.createElement('h2');
  catName.textContent = catData[0].breeds[0].name;
  const catDescription = document.createElement('p');
  catDescription.textContent = catData[0].breeds[0].description;
  const catTemperament = document.createElement('p');
  catTemperament.textContent = `Temperament: ${catData[0].breeds[0].temperament}`;

  catInfo.innerHTML = '';
  catInfo.appendChild(catImage);
  catInfo.appendChild(catName);
  catInfo.appendChild(catDescription);
  catInfo.appendChild(catTemperament);
}

function showErrorNotification() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}


function showLoader() {
  loaderContainer.classList.add('active');
}


function hideLoader() {
  loaderContainer.classList.remove('active');
}


breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  catInfo.style.display = 'none';
  showLoader();

  fetchCatByBreed(selectedBreedId)
    .then((catData) => {
      displayCatInfo(catData);
      catInfo.style.display = 'block';
      hideLoader();
    })
    .catch(() => {
      showErrorNotification();
      hideLoader();
    });
});


fetchBreeds()
  .then((breeds) => {
    populateBreedSelect(breeds);
    breedSelect.disabled = false;
    hideLoader();
  })
  .catch(() => showErrorNotification());
