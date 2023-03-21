import data from "./datos.js"
// import crearCards from './functions.js'



let divContenedorCheck = document.getElementById('ContenedorCheck')
const input = document.querySelector('input')

input.addEventListener("input",superFiltro)

divContenedorCheck.addEventListener("change", superFiltro)

function superFiltro() {
  let filtroUno = filtroTexto(data.events, input.value)
  let filtroDos = filtroCheckbox(filtroUno)
  crearCards(filtroDos)
}


const divContenedorCard = document.getElementById('createCard')


function crearCards(events) {
    if (events.length == 0) {
        divContenedorCard.innerHTML = `<h2>No se escontraron coincidencias!</h2>`
        // el return es para q me corte la funcion
        return
    }
    let cards = '';

    events.forEach(card => {
        cards += `
              <div class="card">
                <img src="${card.image}" class="card-img-top img-card h-40" alt="imagenes del evento">
                  <div class="card-body">
                  <h2 class="card-title">${card.name}</h2>
                  <p class="card-text">${card.description}</p>
                  <p>Price: $${card.price}</p>
                  <a href="./details.html?id=${card.id}" class="btn btn-primary">+ Info</a>
                  </div>
              </div> `          
})

        divContenedorCard.innerHTML = cards;
}
crearCards(data.events)

function crearCheckbox(array) {
    let arrCategory =  array.map(e => e.category ) 
    let categorySet = new Set(arrCategory)
    let arrayChecks = Array.from(categorySet);
    let check =  '';
    arrayChecks.forEach(category => {
      check +=  ` <label class="label" >
                      <input type="checkbox" id="${category}" for="${category}" value="${category}">
                      ${category}
                  </label> `
    });

    divContenedorCheck.innerHTML = check
}
crearCheckbox(data.events);


function filtroTexto(array, texto) {
   let arrFiltrados = array.filter(e => e.name.toLowerCase().includes(texto.toLowerCase()))
   return arrFiltrados
};

function filtroCheckbox(array) {

    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrChecks = Array.from(checkboxes)

    let arrChecked = arrChecks.filter(check => check.checked)
    let arrayCheckedValues = arrChecked.map(e => e.value)
    let arrayFiltrado = array.filter(e => arrayCheckedValues.includes(e.category))

    //si no elijo filtro que aparezca todo
    if (arrayFiltrado.length > 0 ) {
      return arrayFiltrado
    }else{
      return array
    }

  }
  filtroCheckbox(data.events)





export default {crearCards};