import data from './datos.js'
// import crearCards from './index.js'

// ESTO HACE LO DE DETAIL       |||||   HACER UN JS NUEVO DE DETAIL.
const queryString = location.search;
const params = new URLSearchParams(queryString);
const beerId = params.get('id')

const beer = data.events.find(beer => beer.id == beerId);


let ContenedorCardDetail = document.querySelector('#cardDetails')
ContenedorCardDetail.innerHTML = `
         <div class="card">
         <img src="${beer.image}" class="card-img-top img-card h-40" alt="imagenes del evento">
         <div class="card-body">
         <h2 class="card-title">${beer.name}</h2>
         <p class="card-text">${beer.description}</p>
         <p>Price: $${beer.price}</p>
        <a href="./details.html?id=${beer.id}" class="btn btn-primary">+ Info</a>
        </div>
      </div> `   

// ---------------------------------------------------------------------------------------