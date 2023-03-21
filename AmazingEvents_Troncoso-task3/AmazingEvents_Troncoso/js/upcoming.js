import data from "./datos.js"


let divContenedorCheck = document.getElementById('ContenedorCheck')
const input = document.querySelector('input')

input.addEventListener("input",superFiltro)

divContenedorCheck.addEventListener("change", superFiltro)

function superFiltro() {
  let filtroUno = filtroTexto(data.events, input.value)
  let filtroDos = filtroCheckbox(filtroUno)
  upEvents(filtroDos)
}

const divContenedorCard = document.getElementById('createCard')

// FUNCION FILTRA CHECKBOX Y INPUT DE LOS 7 UPCOMING EVENTS   ----------------------------------------------
function upEvents(arr) {

  let eventUpcoming = [];
  let cards = '';

  const fecha = data.currentDate
  eventUpcoming = arr.filter(evento => evento.date > fecha)

  eventUpcoming.forEach(card => {
    cards+= `
    <div class="card">
      <img src="${card.image}" class="card-img-top img-card h-40" alt="imagenes del evento">
        <div class="card-body">
        <h2 class="card-title">${card.name}</h2>
        <p class="card-text">${card.description}</p>
        <p>Price: $${card.price}</p>
        <a href="#" class="btn btn-primary">+ Info</a>
        </div>
    </div> `          
})

divContenedorCard.innerHTML = cards;
}
upEvents(data.events)
// -----------------------------------------------------------------------------------------------------------


// FUNCION CREAR CHECBOX--                      --------------------------------------------------------
function crearCheckbox(array) {
  let arrCategory =  array.map(e => e.category) 
  let categorySet = new Set(arrCategory)
  let arrayChecks = Array.from(categorySet);
  let check =  '';
  arrayChecks.forEach(category => {
    check +=  ` <label class="label">
                    <input type="checkbox" id="${category}" for="${category}" value="${category}">
                    ${category}
                </label> `
  });

  divContenedorCheck.innerHTML = check
}
crearCheckbox(data.events);
// ----------------------------------------------------------------------------------------------------------

function filtroTexto(array, texto) {
   let arrFiltrados = array.filter(e => e.name.toLowerCase().includes(texto.toLowerCase()))
   return arrFiltrados
};
// console.log(filtroTexto);

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
