
let index = 0; // lleva la cuenta de la imagen que se está mostrando actualmente.
const slides = document.querySelectorAll('.slide'); // almacena en la constante los slides
const totalSlides = slides.length; // almacena el total de slides

function mostrarSlide(n) { // n representa el indice del slide que se va a mostrar
    slides.forEach((slide, i) => { // se itera sobre cada elemento
        slide.style.display = (i === n) ? 'block' : 'none'; // si su indice es igual a n se establece su display a "block" y a "none" si no es igual. Esto hace que se muestre la diapositiva que queremos
    });
}

function siguienteSlide() {
    index = (index + 1) % totalSlides; // se incrementa el valor de index en 1 y se usa el MOD para que nunca se supere el total de slides. Esto hace que el indice vuelva a 0 despues de alcanzar el ultimo indice
    mostrarSlide(index); // se muestra el siguiente slide con el valor nuevo de index
}

setInterval(siguienteSlide, 5000); // los slides van cambiando cada 5 segundos
mostrarSlide(index);