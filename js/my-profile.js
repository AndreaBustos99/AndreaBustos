let usuario = localStorage.getItem('usuario');
document.getElementById("navbarNav").innerHTML += `<div class="dropdown">
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
${usuario}
</button>
<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
  <li><a class="dropdown-item" onclick="validarExistenciaDeUsuario()">Mi perfil</a></li>
  <li><a class="dropdown-item" href="index.html" onclick="eliminarUsuario()">Cerrar sesión</a></li>
</ul>
</div>>`

function eliminarUsuario() {
  localStorage.clear();
}

function validarExistenciaDeUsuario() {
  if (usuario === null) {
    window.location = "index.html";
  } else {
    window.location = "my-profile.html";
  }
}

document.getElementById("email").value = usuario
document.getElementById("primerNombre").value = localStorage.getItem('primerNombre')
document.getElementById("primerApellido").value = localStorage.getItem('primerApellido')
document.getElementById("segundoApellido").value = localStorage.getItem('segundoApellido')
document.getElementById("segundoNombre").value = localStorage.getItem('segundoNombre')
document.getElementById("telefono").value = localStorage.getItem('telefono')



document.getElementById("infoDeUsuario").addEventListener("submit", function (e) {

  e.preventDefault();
  e.preventDefault();

  infoDeUsuarioForm = document.getElementById("infoDeUsuario");
  primerNombreInput = document.getElementById("primerNombre");
  segundoNombreInput = document.getElementById("segundoNombre");
  primerApellidoInput = document.getElementById("primerApellido")
  segundoApellidoInput = document.getElementById("segundoApellido")
  emailInput = document.getElementById("email")
  telefonoInput = document.getElementById("telefono")

  primerNombreInput.classList.remove("is-invalid");
  segundoNombreInput.classList.remove("is-invalid");
  primerApellidoInput.classList.remove("is-invalid");
  segundoApellidoInput.classList.remove("is-invalid");
  emailInput.classList.remove("is-invalid");
  telefonoInput.classList.remove("is-invalid");

  if (primerNombreInput.value === "") {
    primerNombreInput.classList.add("is-invalid");
  }

  if (primerApellidoInput.value === "") {
    primerApellidoInput.classList.add("is-invalid");
  }

  if (emailInput.value === "") {
    emailInput.classList.add("is-invalid");
  }

  if (infoDeUsuarioForm.checkValidity()) {
    localStorage.setItem("primerNombre", primerNombreInput.value);
    localStorage.setItem("primerApellido", primerApellidoInput.value);
    localStorage.setItem("usuario", emailInput.value);

    if (segundoNombreInput.value !== "") {
      localStorage.setItem("segundoNombre", segundoNombreInput.value);
    }

    if (segundoApellidoInput.value !== "") {
      localStorage.setItem("segundoApellido", segundoApellidoInput.value);
    }

    if (telefonoInput.value !== "") {
      localStorage.setItem("telefono", telefonoInput.value);
    }
  }
});