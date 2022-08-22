function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

    const inputs = formulario.querySelectorAll('input');

    let vacio = false;

    inputs.forEach((input) => {
        if(input.value == '') {
            vacio = true;
        };
    
    if (vacio) {
        showAlertError();
        formulario.reset();
    } else{
        window.location="home.html"
     
    }

    
    
    })

    })
});

