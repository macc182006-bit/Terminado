// ==========================================
// CARRUSEL DE IMÁGENES - HORIZONTE ANDINO TOURS
// Archivo: assets/js/carrusel.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Obtener todos los elementos necesarios del DOM
    // Selecciona cada bloque .diapositiva dentro de #carrusel[cite: 28]
    const diapositivas = document.querySelectorAll("#carrusel .diapositiva");
    // Selecciona todos los puntos indicadores en orden (0, 1, 2...)[cite: 28]
    const puntos = document.querySelectorAll("#carrusel .carrusel-punto");
    // Selecciona los botones de flecha anterior y siguiente[cite: 28]
    const botonAnterior = document.querySelector("#carrusel-anterior");
    const botonSiguiente = document.querySelector("#carrusel-siguiente");

    // Si en alguna página no existe el carrusel, detiene la ejecución sin dar error
    if (!diapositivas.length || !botonAnterior || !botonSiguiente) {
        return;
    }

    // Índice de la diapositiva visible actualmente (inicia en 0 = primera diapositiva)[cite: 28]
    let indiceActual = 0;

    // 2. Función que cambia la diapositiva y sincroniza el punto indicador[cite: 29, 30]
    function mostrarDiapositiva(indiceNuevo) {
        // Si retrocede antes de la primera (0), salta a la última diapositiva[cite: 29]
        if (indiceNuevo < 0) {
            indiceNuevo = diapositivas.length - 1;
        }
        // Si avanza después de la última, vuelve circularmente a la primera (0)[cite: 12, 29]
        else if (indiceNuevo >= diapositivas.length) {
            indiceNuevo = 0;
        }

        // Quita la clase "activa" de la diapositiva y del punto que estaban visibles[cite: 30]
        diapositivas[indiceActual].classList.remove("activa");
        if (puntos[indiceActual]) {
            puntos[indiceActual].classList.remove("activo");
        }

        // Actualiza el índice y activa la nueva diapositiva y su indicador[cite: 30]
        indiceActual = indiceNuevo;
        diapositivas[indiceActual].classList.add("activa");
        if (puntos[indiceActual]) {
            puntos[indiceActual].classList.add("activo");
        }
    }

    // 3. Evento al pulsar la flecha "Anterior" (resta 1 al índice actual)[cite: 31]
    botonAnterior.addEventListener("click", () => {
        mostrarDiapositiva(indiceActual - 1);
    });

    // 4. Evento al pulsar la flecha "Siguiente" (suma 1 al índice actual)[cite: 31]
    botonSiguiente.addEventListener("click", () => {
        mostrarDiapositiva(indiceActual + 1);
    });

    // 5. Evento al pulsar cada punto indicador (va directo a esa diapositiva)[cite: 31]
    puntos.forEach((punto, indice) => {
        punto.addEventListener("click", () => {
            mostrarDiapositiva(indice);
        });
    });

    // 6. Avance automático cada 5 segundos (5000 milisegundos)[cite: 32]
    setInterval(() => {
        mostrarDiapositiva(indiceActual + 1);
    }, 5000);
});