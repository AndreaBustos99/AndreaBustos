let usuario = localStorage.getItem('usuario');
document.getElementById("navbarNav").innerHTML +=`<div class="dropdown">
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
${usuario}
</button>
<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  <li><a class="dropdown-item" href="/Proyecto-JaP/Workspace inicial/cart.html">Mi carrito</a></li>
  <li><a class="dropdown-item" href="/Proyecto-JaP/Workspace inicial/my-profile.html">Mi perfil</a></li>
  <li><a class="dropdown-item" href="/Proyecto-JaP/Workspace inicial/index.html" onclick="eliminarUsuario()">Cerrar sesión</a></li>
</ul>
</div>>`

function eliminarUsuario(){
    localStorage.removeItem('usuario');
}


let listaDeProductos;
let datosCategorias;
let datosProductos;
let catSeleccionada;
const URLCategorias = `https://japceibal.github.io/emercado-api/cats/cat.json`
let URLProductos = `https://japceibal.github.io/emercado-api/cats_products/${catSeleccionada}.json`

async function getData(URL) {
    let respuesta = await fetch(URL);
    let informacion = await respuesta.json();
    console.log(informacion)
    return informacion;
}


function showProducts(listaDeProductos) {
    productos.innerHTML = " "
    listaDeProductos.forEach(product => {
        productos.innerHTML += `
        <div onclick="setProdID(${product.id})" id=${product.id} class="card" style="width: 18rem; margin: 20px;">
        <img src=${product.image} class="card-img-top" alt="...">
        <div class="card-body"><h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.description}</p>
        </div><ul class="list-group list-group-flush">
        <li class="list-group-item">${product.currency} ${product.cost}</li>
        <li class="list-group-item">${product.soldCount}</li>
        </ul>
        </div>
        `;
    });
}

function showProductsFiltered(preciomin, preciomax) {
    listaDeProductos = listaDeProductos.filter(product => product.cost >= preciomin && product.cost <= preciomax);
    showProducts(listaDeProductos);

}

document.addEventListener('DOMContentLoaded', async function () {
    catSeleccionada = "";
    let catID = localStorage.getItem('catID')
    datosCategorias = await getData(URLCategorias);
    for (let i = 0; i < datosCategorias.length; i++) {
        if (datosCategorias[i].id = catID) {
            catSeleccionada = catID;
            console.log(catSeleccionada);
        }
    }
    console.log(catSeleccionada);
    let URLProductos = `https://japceibal.github.io/emercado-api/cats_products/${catSeleccionada}.json`;
    datosProductos = await getData(URLProductos)
    listaDeProductos = datosProductos.products;
    console.log(listaDeProductos);
    showProducts(listaDeProductos);
});

document.getElementById("rangoDePrecio").addEventListener("click", function () {
    let preciomin = document.getElementById('preciomin').value;
    let preciomax = document.getElementById('preciomax').value;
    showProductsFiltered(preciomin, preciomax);
});

document.getElementById("orderElement").addEventListener("change", function (event) {
    let orderSelected = event.target.value
    if (orderSelected == "Precio ascendente") {
        orderAsc();
    } if (orderSelected == "Precio descendente") {
        orderDesc();
    } if (orderSelected == "Mas relevante primero") {
        orderRelev();
    }
    showProducts(listaDeProductos);
});

function orderAsc() {
    listaDeProductos = listaDeProductos.sort(function (a, b) {
        if (a.cost < b.cost) {
            return -1;
        }
        if (a.cost > b.cost) {
            return 1;
        } else {
            return 0;
        }
    }

    )
}

function orderDesc() {
    listaDeProductos = listaDeProductos.sort(function (a, b) {
        if (a.cost > b.cost) {
            return -1;
        }
        if (a.cost < b.cost) {
            return 1;
        } else {
            return 0;
        }
    }

    )
}

function orderRelev() {
    listaDeProductos = listaDeProductos.sort(function (a, b) {
        if (a.soldCount > b.soldCount) {
            return -1;
        }
        if (a.soldCount < b.soldCount) {
            return 1;
        } else {
            return 0;
        }
    }

    )
}


//funcion para guardar el id del producto en el localstorage
function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html";
}

