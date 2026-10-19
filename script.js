document.addEventListener('DOMContentLoaded', () => {

    // 1. Efecto de cambio de estilo en el Navbar al hacer scroll
    const mainNav = document.getElementById('mainNav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNav.classList.add('navbar-scrolled');
        } else {
            mainNav.classList.remove('navbar-scrolled');
        }
    });

    // 2. Cerrar el menú móvil automáticamente al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
    const navbarCollapse = document.getElementById('navbarNav');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // 3. Carga dinámica de información en el Modal de Productos (Portafolio)
    const productModal = document.getElementById('productModal');
    if (productModal) {
        productModal.addEventListener('show.bs.modal', event => {
            // Botón que disparó el modal
            const button = event.relatedTarget;
            
            // Extraer información de los atributos data-*
            const title = button.getAttribute('data-title');
            const category = button.getAttribute('data-category');
            const desc = button.getAttribute('data-desc');
            const tech = button.getAttribute('data-tech');

            // Actualizar el contenido del modal
            productModal.querySelector('.modal-title').textContent = title;
            productModal.querySelector('#modalCategory').textContent = category;
            productModal.querySelector('#modalDesc').textContent = desc;
            productModal.querySelector('#modalTech').textContent = tech;
        });

        // Si el usuario hace clic en "Solicitar Demo / Cotizar" dentro del modal,
        // cerramos el modal y lo llevamos suavemente al formulario de contacto
        const modalQuoteBtn = document.getElementById('modalQuoteBtn');
        modalQuoteBtn.addEventListener('click', () => {
            const modalInstance = bootstrap.Modal.getInstance(productModal);
            modalInstance.hide();
        });
    }

    // 4. Validación del Formulario de Contacto (Estilo Bootstrap 5 + Simulación de Envío)
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');

    if (contactForm) {
        contactForm.addEventListener('submit', event => {
            event.preventDefault();
            event.stopPropagation();

            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
            } else {
                const name = document.getElementById('nombre').value.trim();
                const email = document.getElementById('correo').value.trim();
                const subject = document.getElementById('asunto').selectedOptions[0].text;
                const message = document.getElementById('mensaje').value.trim();
                const mailSubject = encodeURIComponent(`Consulta de proyecto: ${subject}`);
                const mailBody = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\nTipo de proyecto: ${subject}\n\nDetalles:\n${message}`);

                contactForm.classList.remove('was-validated');
                window.location.href = `mailto:contacto@devminds.sv?subject=${mailSubject}&body=${mailBody}`;

                formAlert.querySelector('div').textContent = 'Se abrió tu aplicación de correo con el mensaje preparado. Envíalo desde allí para completar la solicitud.';
                formAlert.classList.remove('d-none');
                formAlert.classList.add('d-flex');

                // Ocultar la alerta después de 5 segundos
                setTimeout(() => {
                    formAlert.classList.remove('d-flex');
                    formAlert.classList.add('d-none');
                }, 5000);
            }
        }, false);
    }

});