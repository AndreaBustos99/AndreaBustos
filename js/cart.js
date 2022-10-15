let usuario = localStorage.getItem('usuario');
document.getElementById("navbarNav").innerHTML += `<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    ${usuario}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
  <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
  <li><a class="dropdown-item" href="index.html" onclick="eliminarUsuario()">Cerrar sesión</a></li>
</ul>
    </div>>`

function eliminarUsuario() {
  localStorage.removeItem('usuario');
}

async function getData(URL) {
  let respuesta = await fetch(URL);
  let informacion = await respuesta.json();
  return informacion;
}

//Funcion para calcular subtotal dependiendo de la cantidad de unidades del producto
function calcularSubtotal(producto){
  let unidades = document.getElementById("cantidad").value;
  subtotal= unidades*producto.unitCost
  subtotalDato.innerHTML=`${subtotal}`
  return subtotal;
}

//Trae y agrega la informacion del carrito
document.addEventListener('DOMContentLoaded', async function () {
  dataCarrito = await getData(`https://japceibal.github.io/emercado-api/user_cart/25801.json`)
  carrito = dataCarrito;
  productosCarrito = carrito.articles[0];
  productosDeCarrito.innerHTML += `        <tr>
  <th scope="row"> <img src="${productosCarrito.image}" style="width: 50px"> </th>
  <td>${productosCarrito.name}</td>
  <td>${productosCarrito.currency} ${productosCarrito.unitCost}</td>
  <td><input type="number" style="width: 50px"  id="cantidad" min="1" oninput="calcularSubtotal(productosCarrito)" value="1" ></td>
  <td id="subtotalDato">${productosCarrito.unitCost}</td>
</tr>`

});