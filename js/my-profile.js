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

