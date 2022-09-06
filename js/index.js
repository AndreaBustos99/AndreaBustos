function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

    let password = document.getElementById("contrasena")
    let email = document.getElementById("email")
    let inputs = document.querySelectorAll('input')
    let vacio = false;
    document.getElementsByClassName(".navbar navbar-expand-lg navbar-dark bg-dark p-1").innerHTML = "";

    inputs.forEach((input) => {
        if(password.value == ''|| email.value == '') {
            vacio = true;
        };
    
    if (vacio) {
        showAlertError();
        formulario.reset();
    } else{
        let usuario = document.querySelector("#email").value;
        localStorage.setItem("usuario", usuario);
        window.location="home.html";
        
    }
    })
    })


});

