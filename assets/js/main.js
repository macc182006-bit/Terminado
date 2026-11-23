// ==========================================
// MAIN.JS - HORIZONTE ANDINO TOURS
// ==========================================

// 1. BOTÓN DE SCROLL (Volver arriba)
const botonArriba = document.querySelector(".scroll-up");

function mostrarBotonArriba() {
    if (botonArriba) {
        // Si el scroll vertical es menor o igual a 400px, oculta el botón; de lo contrario, lo muestra
        if (window.scrollY <= 400) {
            botonArriba.hidden = true;
        } else {
            botonArriba.hidden = false;
        }
    }
}

// Ejecuta solo si el botón existe en la página actual
if (botonArriba) {
    mostrarBotonArriba();
    window.addEventListener("scroll", mostrarBotonArriba);
}

// 2. BOTÓN HAMBURGUESA (Menú móvil y tablets)
document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("btn-menu");
    const navMenu = document.getElementById("nav-menu");

    if (btnMenu && navMenu) {
        // Alternar visibilidad del menú al hacer clic
        btnMenu.addEventListener("click", () => {
            const estaAbierto = navMenu.classList.toggle("menu-abierto");
            btnMenu.setAttribute("aria-expanded", estaAbierto);
        });

        // Cerrar el menú automáticamente si se agranda la ventana a tamaño de escritorio (> 992px)
        window.addEventListener("resize", () => {
            if (window.innerWidth > 992 && navMenu.classList.contains("menu-abierto")) {
                navMenu.classList.remove("menu-abierto");
                btnMenu.setAttribute("aria-expanded", "false");
            }
        });
    }
});

/* =========================================================
   VALIDACIÓN Y CANCELACIÓN DE ENVÍO POR POST DE FORMULARIOS
   ========================================================= */

// Espera a que toda la estructura HTML de la página termine de cargarse
document.addEventListener("DOMContentLoaded", function () {

    // Selecciona todos los formularios existentes en la página actual
    const formularios = document.querySelectorAll("form");

    // Recorre cada formulario encontrado para asignarle su evento de envío
    formularios.forEach(function (form) {

        // Intercepta el momento en que el usuario presiona el botón de enviar
        form.addEventListener("submit", function (event) {

            // CANCELA el envío real por POST al servidor y evita que la página se recargue
            event.preventDefault();

            // Obtiene todos los campos de entrada, áreas de texto y listas desplegables del formulario
            const campos = form.querySelectorAll("input, textarea, select");

            // Variable bandera para comprobar si todos los campos cumplen la validación
            let todoValido = true;

            // Revisa uno por uno cada campo del formulario
            campos.forEach(function (campo) {

                // Verifica si el campo tiene el atributo HTML "required"
                const esObligatorio = campo.hasAttribute("required");

                // Elimina espacios en blanco al inicio y al final del texto ingresado
                const valorLimpio = campo.value.trim();

                // Si el campo es obligatorio y está vacío, marca error
                if (esObligatorio && valorLimpio === "") {
                    todoValido = false;
                    campo.classList.add("campo-invalido"); // Resalta el borde del campo con error
                    return; // Pasa al siguiente campo
                }

                // Si el campo es de tipo correo electrónico, comprueba que tenga formato válido (usuario@dominio.com)
                if (campo.type === "email" && valorLimpio !== "") {
                    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valorLimpio);
                    if (!correoValido) {
                        todoValido = false;
                        campo.classList.add("campo-invalido"); // Resalta el borde si el correo es inválido
                        return;
                    }
                }

                // Si el campo es correcto, quita cualquier marca previa de error
                campo.classList.remove("campo-invalido");
            });

            // Si algún campo falló la validación, detiene el proceso y avisa al usuario
            if (!todoValido) {
                alert("Por favor, completa correctamente todos los campos obligatorios.");
                return;
            }

            // Si todo está validado, confirma al usuario sin ejecutar el POST real
            alert("¡Datos validados correctamente! El envío por POST fue cancelado para esta entrega.");

            // Limpia los campos del formulario después de confirmar
            form.reset();
        });
    });
});