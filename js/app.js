document.addEventListener('DOMContentLoaded', function() {
    
    // --- SELECCIÓN DE ELEMENTOS DEL HTML ---
    const categorySelect = document.getElementById('search-category');
    const cityInput = document.getElementById('search-city');
    const searchButton = document.querySelector('.btn-search');
    const container = document.getElementById('lista-trabajadores-container');
    const resultsCountSpan = document.getElementById('results-count');

    // --- INICIALIZACIÓN DEL MAPA ---
    const centroMapa = [-39.0333, -67.5833]; 
    const zoomInicial = 12; 
    const mapa = L.map('mapa-interactivo').setView(centroMapa, zoomInicial);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Array para guardar los marcadores que están actualmente en el mapa
    let marcadoresEnMapa = [];

    // --- FUNCIÓN PARA "PINTAR" LOS TRABAJADORES Y SUS PINES ---
    function pintarTrabajadores(listaDeTrabajadores) {
        container.innerHTML = '';
        if (resultsCountSpan) {
            resultsCountSpan.textContent = listaDeTrabajadores.length;
        }

        // Antes de pintar los nuevos, limpiamos los pines anteriores del mapa
        marcadoresEnMapa.forEach(marcador => mapa.removeLayer(marcador));
        marcadoresEnMapa = []; // Vaciamos el array de referencias

        if (listaDeTrabajadores.length === 0) {
            container.innerHTML = '<p>No se encontraron profesionales con esos criterios de búsqueda.</p>';
            return; 
        }

        listaDeTrabajadores.forEach(trabajador => {
            // Creamos la tarjeta de trabajador
            const tarjetaHTML = `
                <article class="worker-card">
                    <div class="worker-card-header">
                        <img src="${trabajador.foto}" alt="Foto de ${trabajador.nombre}">
                        <div class="info">
                            <h4>${trabajador.nombre}</h4>
                            <p>${trabajador.oficio} en ${trabajador.ciudad}</p>
                        </div>
                    </div>
                    <div class="worker-card-body">
                        <p class="description">${trabajador.descripcion}</p>
                    </div>
                    <div class="worker-card-footer">
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <span>${trabajador.valoracion} (${trabajador.opiniones} opiniones)</span>
                        </div>
                        <a href="detalle.html" class="btn-contact" onclick="guardarIdDelTrabajador(${trabajador.id})">Contactar</a>
                    </div>
                </article>
            `;
            container.innerHTML += tarjetaHTML;

            // Creamos un pin en el mapa para este trabajador
            if (trabajador.coordenadas) {
                const marcador = L.marker(trabajador.coordenadas).addTo(mapa)
                    .bindPopup(`<b>${trabajador.nombre}</b><br>${trabajador.oficio}`);
                
                marcadoresEnMapa.push(marcador); // Guardamos el nuevo marcador
            }
        });
    }

    // --- FUNCIÓN PARA FILTRAR ---
    function filtrarTrabajadores() {
        const categoriaSeleccionada = categorySelect.value;
        const ciudadEscrita = cityInput.value.trim().toLowerCase();
        const trabajadoresFiltrados = trabajadores.filter(trabajador => {
            const cumpleCategoria = categoriaSeleccionada === 'Toda las categorías' || trabajador.oficio === categoriaSeleccionada;
            const cumpleCiudad = ciudadEscrita === '' || trabajador.ciudad.toLowerCase().includes(ciudadEscrita);
            return cumpleCategoria && cumpleCiudad;
        });
        pintarTrabajadores(trabajadoresFiltrados);
    }
    
    // --- FUNCIÓN PARA POPULAR EL FILTRO DE CATEGORÍAS ---
    function popularFiltroCategorias() {
        const oficiosUnicos = [...new Set(trabajadores.map(t => t.oficio))];
        oficiosUnicos.forEach(oficio => {
            const opcion = document.createElement('option');
            opcion.textContent = oficio;
            opcion.value = oficio;
            categorySelect.appendChild(opcion);
        });
    }

    // --- EJECUCIÓN INICIAL Y EVENTOS ---
    popularFiltroCategorias();
    pintarTrabajadores(trabajadores);
    searchButton.addEventListener('click', function(evento) {
        evento.preventDefault();
        filtrarTrabajadores();
    });
});

// --- FUNCIÓN GLOBAL ---
function guardarIdDelTrabajador(id) {
    localStorage.setItem('trabajadorIdSeleccionado', id);
}