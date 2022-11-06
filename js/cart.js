var subtotal = "";
var porcentajeDeEnvio = 0.15;
var numeroDeCuentaInput = document.getElementById("numeroDeCuenta");
numeroDeCuentaInput.disabled = true;
var numeroDeTarjeta = document.getElementById("numeroDeTarjeta");
var codigoDeSeg = document.getElementById("codigoDeSeg");
var vencimiento = document.getElementById("vencimiento");
numeroDeTarjeta.disabled = false;
codigoDeSeg.disabled = false;
vencimiento.disabled = false;
let infoMissing = false;
let calleInput = document.getElementById("calle");
let numeroInput = document.getElementById("numero");
let esquinaInput = document.getElementById("esquina");
let numeroDeTarjetaInput = document.getElementById("numeroDeTarjeta");
let codigoDeSegInput = document.getElementById("codigoDeSeg");
let vencimientoInput = document.getElementById("vencimiento");
let btnSeleccionar = document.getElementById("btnSeleccionar");
const forms = document.querySelectorAll('.needs-validation')


//Agrego el usuario a la navbar
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

//Funcion para calcular subtotal dependiendo de la cantidad de unidades del producto y actualizar en tiempo real
function actualizarInformacion(producto) {
  let unidades = document.getElementById("cantidad").value;
  subtotal = unidades * producto.unitCost
  subtotalDato.innerHTML = producto.currency + " " + subtotal
  costoProducto.innerHTML = producto.currency + " " + subtotal
  costoDeEnvio.innerHTML = producto.currency + " " + subtotal * porcentajeDeEnvio
  costoTotal.innerHTML = producto.currency + " " + (subtotal * porcentajeDeEnvio + subtotal)
  return subtotal;
}

//Seleccionar tipo de envio para calcular el costo 
document.addEventListener("DOMContentLoaded", function (e) {

  document.getElementById("premiumradio").addEventListener("change", function () {
    porcentajeDeEnvio = 0.15
    actualizarInformacion(productosCarrito);
  });

  document.getElementById("expressradio").addEventListener("change", function () {
    porcentajeDeEnvio = 0.07
    actualizarInformacion(productosCarrito);
  });

  document.getElementById("standardradio").addEventListener("change", function () {
    porcentajeDeEnvio = 0.05
    actualizarInformacion(productosCarrito);
  });
});


//Trae y agrega la informacion del carrito
document.addEventListener('DOMContentLoaded', async function () {
  dataCarrito = await getData(`https://japceibal.github.io/emercado-api/user_cart/25801.json`)
  carrito = dataCarrito;
  productosCarrito = carrito.articles[0];
  productosDeCarrito.innerHTML += `        <tr>
  <th scope="row"> <img src="${productosCarrito.image}" style="width: 50px"> </th>
  <td>${productosCarrito.name}</td>
  <td>${productosCarrito.currency} ${productosCarrito.unitCost}</td>
  <td><input type="number" style="width: 50px"  id="cantidad" min="1" oninput="actualizarInformacion(productosCarrito)" value="1" ></td>
  <td id="subtotalDato">${productosCarrito.currency + " " + productosCarrito.unitCost}</td>
</tr>`
  costoProducto.innerHTML = productosCarrito.currency + " " + productosCarrito.unitCost
  costoDeEnvio.innerHTML = productosCarrito.currency + " " + productosCarrito.unitCost * porcentajeDeEnvio
  costoTotal.innerHTML = productosCarrito.currency + " " + (productosCarrito.unitCost * porcentajeDeEnvio + productosCarrito.unitCost)

});

// Habilita y deshabilita los campos del medio de pago segun el seleccionado 
document.getElementById("tarjetaDeCreditoRadio").addEventListener('click', function () {
  numeroDeCuentaInput.disabled = true;
  numeroDeTarjeta.disabled = false;
  codigoDeSeg.disabled = false;
  vencimiento.disabled = false;
})
document.getElementById("transferenciaBancariaRadio").addEventListener('click', function () {
  numeroDeCuentaInput.disabled = false;
  numeroDeTarjeta.disabled = true;
  codigoDeSeg.disabled = true;
  vencimiento.disabled = true;
})



function showAlertSuccess() {
  document.getElementById("alert-success").classList.add("show");
}

function nomostraralerta(){
  document.getElementById("alert-success").classList.remove("show");
}


//Verificacion de metodos de pago y agrega el texto de alerta para completarlos 
function verificacionMetodosDePago() {

  if (numeroDeCuentaInput.value === "" && codigoDeSegInput.value === "" && vencimientoInput.value === "" ) {
    alert_mediodepago.innerHTML = `
      <p>Debe completar metodo de pago</p>`;
    btnSeleccionar.classList.add('text-danger');

  } else if(numeroDeCuentaInput.value === ""){
    alert_mediodepago.innerHTML = `
    <p>Debe completar metodo de pago</p>`;
  btnSeleccionar.classList.add('text-danger');
  }
  else {
    alert_mediodepago.innerHTML = '';
    btnSeleccionar.classList.remove('text-danger');
  }
}

// Verificacion de las condiciones para finalizar la compra 
document.getElementById("infoDeCompra").addEventListener("submit", function (e) {

  e.preventDefault();
  e.preventDefault();

  calleInput = document.getElementById("calle");
  numeroInput = document.getElementById("numero");
  esquinaInput = document.getElementById("esquina");
  infoMissing = false;
  numeroDeTarjetaInput = document.getElementById("numeroDeTarjeta");
  codigoDeSegInput = document.getElementById("codigoDeSeg");
  vencimientoInput = document.getElementById("vencimiento");
  numeroDeCuentaInput = document.getElementById("numeroDeCuenta");
  btnSeleccionar = document.getElementById("btnSeleccionar");



  //Quito las clases que marcan como inválidos
  calleInput.classList.remove('is-invalid');
  numeroInput.classList.remove('is-invalid');
  esquinaInput.classList.remove('is-invalid');
  numeroDeTarjetaInput.classList.remove('is-invalid');
  codigoDeSegInput.classList.remove('is-invalid');
  vencimientoInput.classList.remove('is-invalid');
  numeroDeCuentaInput.classList.remove('is-invalid');


  //Se realizan los controles necesarios
  if (calleInput.value === "") {
    calleInput.classList.add('is-invalid');
    infoMissing = true;
  }

  if (numeroInput.value === "") {
    numeroInput.classList.add('is-invalid');
    infoMissing = true;
  }

  if (esquinaInput.value === "") {
    esquinaInput.classList.add('is-invalid');
    infoMissing = true;
  }


  if (tarjetaDeCreditoRadio.checked) {
    if (numeroDeTarjetaInput.value === "" && codigoDeSegInput.value === "" && vencimientoInput.value === "") {
      numeroDeTarjetaInput.classList.add('is-invalid');
      codigoDeSegInput.classList.add('is-invalid');
      vencimientoInput.classList.add('is-invalid');
      alert_mediodepago.innerHTML = `
      <p>Debe completar metodo de pago</p>`;
      btnSeleccionar.classList.add('text-danger');
      //verificacionMetodosDePago()
      infoMissing = true;
  
  } else if (transferenciaBancariaRadio.checked) {
    if (numeroDeCuentaInput.value === "") {
      numeroDeCuentaInput.classList.add('is-invalid');
      alert_mediodepago.innerHTML = `
      <p>Debe completar metodo de pago</p>`;
      btnSeleccionar.classList.add('text-danger');
      infoMissing = true;
      //verificacionMetodosDePago()
    }

  }}


  //Si se verifican todas las condiciones anteriores, se culmina la compra
if(document.getElementById("infoDeCompra").checkValidity() && document.getElementById("metodosDePagoForm").checkValidity()){
showAlertSuccess();
alert_mediodepago.innerHTML = '';
    btnSeleccionar.classList.remove('text-danger')
//verificacionMetodosDePago()
document.getElementById("infoDeCompra").reset();
document.getElementById("metodosDePagoForm").reset();
}
});
