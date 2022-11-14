let usuario = localStorage.getItem('usuario');
document.getElementById("navbarNav").innerHTML +=`<div class="dropdown">
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
${usuario}
</button>
<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
  <li><a class="dropdown-item" onclick="validarExistenciaDeUsuario()">Mi perfil</a></li>
  <li><a class="dropdown-item" href="index.html" onclick="eliminarUsuario()">Cerrar sesión</a></li>
</ul>
</div>>`

function eliminarUsuario(){
    localStorage.clear();
}

function validarExistenciaDeUsuario(){
    if (usuario === null){
    window.location="index.html";
  } else { 
    window.location="my-profile.html";
  }
}


let productID;
let producto;
let infoProducto;
let comentariosInfo;
let comentarioAgregado;
let calificacion;
let fecha = "";


async function getData(URL) {
    let respuesta = await fetch(URL);
    let informacion = await respuesta.json();
    return informacion;
}

//Trae la informacion del producto
document.addEventListener('DOMContentLoaded', async function () {
    productID = localStorage.getItem("ProdID");
    producto = await getData(`https://japceibal.github.io/emercado-api/products/${productID}.json`)
    infoProducto = producto;
    productInfo.innerHTML = "";
    productInfo.innerHTML += `
            <div id=${infoProducto.id}>
            <h3>${infoProducto.name}</h3>
            <hr>
            <p><b>Precio</b><br></br>${infoProducto.currency} ${infoProducto.cost}</p>
            <p><b>Descripción</b><br></br>${infoProducto.description}</p>
            <p><b>Categoria</b><br></br>${infoProducto.category}</p>
            <p><b>Cantidad vendidos</b><br></br>${infoProducto.soldCount}</p>
            <p><b>Imagenes</b></p>
            </div>
            `
    productImg.innerHTML = "";
    infoProducto.images.forEach(imagen => {
        productImg.innerHTML += `
        <div class="card" style="width: 250px;">
        <img src="${imagen}" alt="Card image cap">
        </div>
        `
    });
    productInfo.innerHTML += `</div>`

// Trae lo productos relacionados 
    let productosRelacionados= infoProducto.relatedProducts;
    prodRelacionados.innerHTML="";
    productosRelacionados.forEach(product => {
        prodRelacionados.innerHTML += `
        <div onclick="setProdID(${product.id})" id=${product.id} class="card" style="width: 18rem; margin: 20px;">
        <img src=${product.image} class="card-img-top" alt="...">
        <div class="card-body"><h5 class="card-title">${product.name}</h5>
        </div>
        </div>
        `;
    });      
});

function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html";
}

//Trae los comentarios y calificacion del producto
document.addEventListener('DOMContentLoaded', async function () {
    datosComentarios = await getData(`https://japceibal.github.io/emercado-api/products_comments/${productID}.json`)
    comentariosInfo = datosComentarios;
    comentarios.innerHTML = "<h5>Comentarios</h5>";
    comentariosInfo.forEach(coment => {
        comentarios.innerHTML += `
    <div class="card " >
    <p><b>${coment.user}</b> ${coment.dateTime}</p> 
    <div  id= "estrellas">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        ${'<span id="estrella" class="fa fa-star checked"></span>'.repeat(coment.score)} ${'<span id="estrella" class="fa fa-star"></span>'.repeat(5 - coment.score)}</div>

    <p>${coment.description}</p>
    `
    })

});

//Funcion para mostrar la fecha en los comentarios agregados
function verFecha() {
    let date = new Date();
    fecha = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    return fecha;
}

//Agrega comentario 
document.getElementById("agregarComentario").addEventListener("click", function () {
    calificacion = document.getElementById("calificacion").value;
    comentarioAgregado = document.getElementById("comentarioAgregado").value;
    comentarios.innerHTML += `
    <div class="card " >
    <p><b>${localStorage.getItem("usuario")}</b> ${fecha} </p> 
    <div  id= "estrellas">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    ${'<span id="estrella" class="fa fa-star checked"></span>'.repeat(calificacion)} ${'<span id="estrella" class="fa fa-star"></span>'.repeat(5 - calificacion)}</div>
    <p>${comentarioAgregado}</p>
    `
})
