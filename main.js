'use strict';
const inputDog = document.querySelector('.input-dog');
const btnSearch = document.querySelector('.btn-search');
const btnReset = document.querySelector('.btn-reset');
const resultNameDog = document.querySelector('.search-result');
const listPhoto = document.querySelector('.list__photo');

let breedList;

//obtengo listado de razas de perritos

fetch('https://dog.ceo/api/breeds/list/all')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    //resultNameDog.innerHTML = JSON.stringify(data.message);
    breedList = data.message;
  });


//local storage (input value se va a guardar en LS)
const lsNameDog = localStorage.getItem('Dog-name');
if (lsNameDog) {
  inputDog.value = lsNameDog
};


//functions
function handleSearchInput(){
  const InputDogContent = inputDog.value;
  if (InputDogContent) {
  resultNameDog.innerHTML = InputDogContent;
  localStorage.setItem('Dog-name', InputDogContent);
  }
  else {
    resultNameDog.innerHTML = `aún no has buscado tu perrito`; 
    localStorage.removeItem('Dog-name');
  }
}

function handleSearchButton() {
  let dogSearched = inputDog.value;
  if(breedList.hasOwnProperty(dogSearched))
  {
    resultNameDog.innerHTML= `Raza de perro encontrada: ${dogSearched}`;
    const urlDogPhoto = `https://dog.ceo/api/breed/${dogSearched}/images`;
    listPhoto.innerHTML = '';

    fetch(urlDogPhoto)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
    // data.message es el array de fotos de perros
    const dataPhotos = data.message;

    //voy a pintar solo 6 elementos de data porque son muchas fotos
    for (let i=0; i<6; i++) {
      let photoToPrint =  `<li class="list__photo-element">
      <img src="${dataPhotos[i]}" alt="foto de perrito" class="dog-photo">
      </li>`;
      listPhoto.innerHTML = listPhoto.innerHTML + photoToPrint
    } 
    //TODO:voy a generar li por cada foto
    });

  }
    else {
      resultNameDog.innerHTML= `Lo siento! No encontramos tu raza favorita :(`
    }
}

function handleResetButton (event) {
  inputDog.value = '';
  inputDog.placeholder  = 'Buscar raza    🔍'
  listPhoto.innerHTML = '';
  resultNameDog.innerHTML = '';
}

//event listeners
inputDog.addEventListener('keyup', handleSearchInput);
btnSearch.addEventListener('click', handleSearchButton);
btnReset.addEventListener('click', handleResetButton);

