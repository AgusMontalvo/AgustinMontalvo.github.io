// Este evento se asegura de que nuestro código se ejecute solo cuando la página de detalles ha cargado completamente.
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. LEER DE LA MEMORIA: Leemos la 'cajita de memoria' (localStorage) para obtener el ID que guardamos.
    const trabajadorId = localStorage.getItem('trabajadorIdSeleccionado');

    // Si por alguna razón no encontramos un ID, no hacemos nada para evitar errores.
    if (!trabajadorId) {
        console.error("No se encontró el ID del trabajador guardado.");
        return;
    }

    // 2. BUSCAR AL TRABAJADOR: Usamos el método 'find' para buscar en nuestro array 'trabajadores'
    // (que viene del archivo datos.js) al trabajador que tenga el mismo ID que recuperamos.
    const trabajador = trabajadores.find(t => t.id == trabajadorId);

    // Si no se encuentra un trabajador con ese ID, mostramos un error en la consola.
    if (!trabajador) {
        console.error("Trabajador no encontrado con el ID:", trabajadorId);
        return;
    }

    // 3. PINTAR LOS DATOS EN EL HTML:
    // Ahora que tenemos al trabajador correcto, tomamos su información y la ponemos en el HTML.

    // Foto de perfil
    document.getElementById('worker-photo-container').innerHTML = `<img src="${trabajador.foto}" alt="Foto de ${trabajador.nombre}">`;
    
    // Nombres y Títulos
    document.getElementById('worker-name-sidebar').textContent = trabajador.nombre;
    document.getElementById('worker-oficio-sidebar').textContent = trabajador.oficio;
    document.getElementById('worker-name-main').textContent = trabajador.nombre;
    document.getElementById('worker-city-main').textContent = `Ubicado en ${trabajador.ciudad}`;

    // Descripción
    document.getElementById('worker-description').textContent = trabajador.descripcion;

    // Generar las estrellas de valoración
    const ratingContainer = document.getElementById('worker-rating-sidebar');
    const valoracionRedondeada = Math.round(trabajador.valoracion);
    let estrellasHTML = '';
    for (let i = 0; i < 5; i++) {
        if (i < valoracionRedondeada) {
            estrellasHTML += '<i class="fas fa-star"></i>'; // Estrella llena
        } else {
            estrellasHTML += '<i class="far fa-star"></i>'; // Estrella vacía
        }
    }
    // Mostramos las estrellas y el texto de la valoración
    ratingContainer.innerHTML = estrellasHTML + ` <span>${trabajador.valoracion} de ${trabajador.opiniones} opiniones</span>`;

});