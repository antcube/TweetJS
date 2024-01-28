// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Events Listeners
eventListeners();

function eventListeners() {

    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento este listo, obtiene LocalStorage
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML(tweets);
    });
}

// Funciones
function agregarTweet(e) {
    e.preventDefault();
    
    // Seleccionar textArea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value.trim();
    // Validar si es esta vacio el textarea
    if(tweet === '') {
        // Mandar el mensaje de error
        mostrarError('Un mensaje no puede ir vacio')
        return;
    }
    
    // Creamos un objeto para luego añadir al arreglo
    const tweetObj = {
        id: Date.now(),
        tweet, // Si son iguales el key y value -> tweet: tweet
    }

    // Añadir al arreglo con Spread Operator
    tweets = [...tweets, tweetObj];

    // Creamos el HTML con el arreglo obtenido
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error) {
    const contenido = document.querySelector('#contenido');
    
    //Verifica si ya hay un mensaje de error creado
    const mensajeErrorExistente = contenido.querySelector('.error');

    if(mensajeErrorExistente) {
        // Si existe, solo actualiza el contenido
        mensajeErrorExistente.textContent = error;
        return;
    }

    // Si no existe, crea un nuevo mensaje de error
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    // Agrega el nuevo mensaje de error al contenedor
    contenido.appendChild(mensajeError);

    // Establece un temporazidor para eliminar el mensaje
    setTimeout(() => {
        mensajeError.remove();
    }, 2000);
}

// Muestra un listado de los tweets
function crearHTML() {
    limpiarHTML();

    if(tweets.length) {
        tweets.forEach( tweet => {
            // Agregar un boton eliminar
            const btnEliminar = document.createElement('A');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            // Añadir evento de click para luego eliminar un tweet
            btnEliminar.addEventListener('click', () => {
                borrarTweet(tweet.id);
            });

            // Agregamos o creamos el HTML 
            const li = document.createElement('LI');
            li.textContent = tweet.tweet;

            // Insertamos lo creado
            li.appendChild(btnEliminar);

            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}

// Limpiar el HTML
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

// Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}