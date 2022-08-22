function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

/*     const data_pass = new FormData(formulario);

    let password1 = data_pass.get('contrasenia1');
    let password2 = data_pass.get('contrasenia2');

    if (password1 != password2) {
        alert('Las contraseñas ingresadas no coinciden');
    }
 */
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

