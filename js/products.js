let usuario = localStorage.getItem('usuario');
document.getElementById("navbarNav").innerHTML += `<h5 id="usuario">${usuario}</h5>`;
let autoLista;
let productosFiltrados;
let datos;

async function getData() {
    let respuesta = await fetch('https://japceibal.github.io/emercado-api/cats_products/101.json');
    let informacion = await respuesta.json();
    return informacion;
}


function showProducts(productosFiltrados) {
    productos.innerHTML = " "
    let catID = localStorage.getItem('catID')
    console.log(catID)
    console.log(datos.catID)
    let catSeleccionada = datos.catID
    if (catID == catSeleccionada) {
    productosFiltrados.forEach(auto => {
        productos.innerHTML += `
        <div class="card" style="width: 18rem; margin: 20px;">
        <img src=${auto.image} class="card-img-top" alt="...">
        <div class="card-body"><h5 class="card-title">${auto.name}</h5>
        <p class="card-text">${auto.description}</p>
        </div><ul class="list-group list-group-flush">
        <li class="list-group-item">${auto.currency} ${auto.cost}</li>
        <li class="list-group-item">${auto.soldCount}</li>
        </ul>
        </div>
        `;
    });
}
}

function showProductsFiltered(preciomin, preciomax) {
    productosFiltrados = autoLista.filter(auto => auto.cost >= preciomin && auto.cost <= preciomax);
    showProducts(productosFiltrados);

}

document.addEventListener('DOMContentLoaded', async function () {
    datos = await getData();
    autoLista = datos.products;
    showProducts(autoLista);
});

document.getElementById("rangoDePrecio").addEventListener("click", function () {
    let preciomin = document.getElementById('preciomin').value;
    let preciomax = document.getElementById('preciomax').value;
    showProductsFiltered(preciomin, preciomax);
});

document.getElementById("orderElement").addEventListener("change", function (event) {
    let orderSelected = event.target.value
    if (orderSelected == "Precio ascendente"){
        orderAsc();
    } if (orderSelected == "Precio descendente"){
        orderDesc();
    } if (orderSelected == "Mas relevante primero"){
        orderRelev();
    }
    showProducts(autoLista);
});

function orderAsc() {
    autoLista = autoLista.sort(function (a, b) {
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
    autoLista = autoLista.sort(function (a, b) {
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
    autoLista = autoLista.sort(function (a, b) {
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


