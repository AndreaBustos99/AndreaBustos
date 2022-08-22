async function getData(){
    let respuesta = await fetch('https://japceibal.github.io/emercado-api/cats_products/101.json');
    let informacion = await respuesta.json();
    return informacion;
}

document.addEventListener('DOMContentLoaded', async function(){
    let datos= await getData();
    let autoLista = datos.products
    productos.innerHTML= " "
    autoLista.forEach(auto => {
        productos.innerHTML+= `
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
});
