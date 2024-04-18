// Variables

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // Cuando agregas un curso cuando presionas "agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);

  // elimina elementos del carrito
  carrito.addEventListener("click", eliminarCurso);

  // vaciar carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = [];
    limpiarHTML();
  });
}

// Funciones
function agregarCurso(event) {
  event.preventDefault();
  if (event.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = event.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

function eliminarCurso(event) {
  if (event.target.classList.contains("borrar-curso")) {
    const cursoId = event.target.getAttribute("data-id");
    //Eliminar del arreglo por data id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML(); // Actualizar lista carrito
  }
}

// lee el contenido del html y obtiene info del curso
function leerDatosCurso(curso) {
  // crear objeto curso
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // verificar si ya existe
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // retorna obj actualizado
      } else {
        return curso; // retorna obj no duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  carritoHTML();
}

function carritoHTML() {
  // limpiar html
  limpiarHTML();
  // agregar al carrito

  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="${imagen}" alt="${titulo}" style="width:75px;height:75px"/>
        </td>  
      <td>
        ${titulo}
      </td>
      <td>
        ${precio}
      </td>
      <td>
        ${cantidad}
      </td>
      <td>
      <a href="#" class="borrar-curso" data-id="${id}">X</a>
      </td>
    `;
    //Agrega row en el tbody
    contenedorCarrito.appendChild(row);
  });
}

function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
