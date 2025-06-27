// www/js/theme.js

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // Función para aplicar el tema guardado
    function aplicarTemaGuardado() {
        const temaGuardado = localStorage.getItem('theme');
        if (temaGuardado === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }

    // Al hacer clic en el botón
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            // Guardamos la preferencia en localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Aplicamos el tema al cargar la página
    aplicarTemaGuardado();
});
