(function () {
  'use strict';

  // Configuración (se carga desde config.js)
  const formUrl = typeof CONFIG !== 'undefined' ? CONFIG.formUrl : '#';
  const whatsapp = typeof CONFIG !== 'undefined' ? CONFIG.whatsapp : '';
  const telefono = typeof CONFIG !== 'undefined' ? CONFIG.telefono : '';
  const email = typeof CONFIG !== 'undefined' ? CONFIG.email : '';

  function buildFormUrl(producto) {
    if (!formUrl || formUrl === '#' || formUrl.includes('tu-formulario')) {
      return '#';
    }
    const url = new URL(formUrl);
    if (producto) {
      url.searchParams.set('producto', producto);
    }
    return url.toString();
  }

  function buildWhatsAppUrl() {
    const mensaje = encodeURIComponent('Hola, me interesa conocer más sobre sus servicios.');
    return `https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${mensaje}`;
  }

  // CTAs al formulario
  document.querySelectorAll('.cta-form').forEach(function (el) {
    el.addEventListener('click', function (e) {
      const producto = el.getAttribute('data-producto') || null;
      const url = buildFormUrl(producto);
      if (url && url !== '#') {
        e.preventDefault();
        window.location.href = url;
      }
    });
    if (formUrl && formUrl !== '#' && !formUrl.includes('tu-formulario')) {
      el.href = buildFormUrl(el.getAttribute('data-producto'));
    }
  });

  // WhatsApp
  const whatsappEl = document.querySelector('.whatsapp-btn');
  if (whatsappEl && whatsapp) {
    whatsappEl.href = buildWhatsAppUrl();
    whatsappEl.setAttribute('target', '_blank');
    whatsappEl.setAttribute('rel', 'noopener noreferrer');
  }

  // Footer contacto
  const footerTel = document.getElementById('footer-tel');
  if (footerTel && telefono) {
    footerTel.href = 'tel:' + telefono.replace(/\D/g, '');
    footerTel.textContent = telefono;
  }

  const footerEmail = document.getElementById('footer-email');
  if (footerEmail && email) {
    footerEmail.href = 'mailto:' + email;
    footerEmail.textContent = email;
  }

  // Año actual en footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Menú móvil
  const menuToggle = document.querySelector('.header__menu-toggle');
  const headerNav = document.querySelector('.header__nav');

  if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = headerNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    headerNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        headerNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú');
      });
    });
  }
})();
