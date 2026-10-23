document.addEventListener('DOMContentLoaded', () => {
  const btnOpenSos = document.getElementById('btn-open-sos');
  const btnCloseSos = document.getElementById('btn-close-sos');
  const modalSos = document.getElementById('modal-sos');
  const notification = document.getElementById('notification');
  const inputFoto = document.getElementById('input-foto-perfil');
  const headerImg = document.getElementById('header-avatar-img');
  const headerInitials = document.getElementById('header-avatar-initials');
  const profileImg = document.getElementById('profile-avatar-img');
  const profileInitials = document.getElementById('profile-avatar-initials');

  let idiomaActual = 'ES'; // 'ES' o 'PT'

  // NOTIFICACIÓN TOAST
  window.notificar = function(mensaje) {
    if (!notification) return;
    notification.innerText = mensaje;
    notification.classList.remove('hidden');
    notification.classList.add('notif-active');

    setTimeout(() => {
      notification.classList.add('hidden');
      notification.classList.remove('notif-active');
    }, 4000);
  };

  // CAMBIO DE NAVEGACIÓN
  window.cambiarSeccion = function(idSeccion) {
    document.querySelectorAll('.section-view').forEach(sec => sec.classList.add('hidden'));

    const seccionActiva = document.getElementById(idSeccion);
    if (seccionActiva) {
      seccionActiva.classList.remove('hidden');
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('text-orange-500', 'font-bold');
      btn.classList.add('text-slate-500');
    });

    const btnNavActivo = document.getElementById(`nav-${idSeccion}`);
    if (btnNavActivo) {
      btnNavActivo.classList.remove('text-slate-500');
      btnNavActivo.classList.add('text-orange-500', 'font-bold');
    }
  };

  // FILTRADO DE BUSQUEDA EN EL DIRECTORIO
  window.filtrarComercios = function() {
    const query = document.getElementById('input-search').value.toLowerCase();
    const tarjetas = document.querySelectorAll('.card-comercio');

    tarjetas.forEach(card => {
      const texto = card.innerText.toLowerCase();
      if (texto.includes(query)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  };

  window.filtrarCategoria = function(categoria) {
    const tarjetas = document.querySelectorAll('.card-comercio');

    tarjetas.forEach(card => {
      if (card.classList.contains(categoria)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    notificar(`🔍 Filtrando categoría: ${categoria.toUpperCase()}`);
  };

  window.mostrarTodos = function() {
    document.querySelectorAll('.card-comercio').forEach(card => card.classList.remove('hidden'));
    document.getElementById('input-search').value = '';
  };

  // SELECTOR BILINGÜE (ESPAÑOL / PORTUGUÉS)
  window.toggleIdioma = function() {
    const flagLang = document.getElementById('flag-lang');
    const lblLang = document.getElementById('lbl-lang');
    const txtSlogan = document.getElementById('txt-slogan');
    const txtCorredor = document.getElementById('txt-corredor');
    const txtSosTitle = document.getElementById('txt-sos-title');
    const txtSosBtn = document.getElementById('txt-sos-btn');

    if (idiomaActual === 'ES') {
      idiomaActual = 'PT';
      flagLang.innerText = '🇧🇷';
      lblLang.innerText = 'PT';
      txtSlogan.innerText = 'Tudo o que a sua viagem precisa';
      txtCorredor.innerText = 'Corredor Internacional Libres 🇦🇷 ↔ Uruguaiana 🇧🇷';
      txtSosTitle.innerText = 'Socorro de Emergência na Estrada?';
      txtSosBtn.innerText = '⚠️ Solicitar Assistência SOS';
      notificar('🇧🇷 Idioma alterado para Português (Brasil)');
    } else {
      idiomaActual = 'ES';
      flagLang.innerText = '🇦🇷';
      lblLang.innerText = 'ES';
      txtSlogan.innerText = 'Todo lo que tu viaje necesita';
      txtCorredor.innerText = 'Paso de los Libres 🇦🇷 ↔ Uruguaiana 🇧🇷';
      txtSosTitle.innerText = '¿Auxilio de Emergencia en Ruta?';
      txtSosBtn.innerText = '⚠️ Solicitar Asistencia SOS';
      notificar('🇦🇷 Idioma cambiado a Español');
    }
  };

  // MODAL SOS
  if (btnOpenSos && modalSos) {
    btnOpenSos.addEventListener('click', () => modalSos.classList.remove('hidden'));
  }

  if (btnCloseSos && modalSos) {
    btnCloseSos.addEventListener('click', () => modalSos.classList.add('hidden'));
  }

  window.confirmarAuxilio = function(tipo, icono, detalle) {
    modalSos.classList.add('hidden');

    if (btnOpenSos && !btnOpenSos.classList.contains('is-animating')) {
      btnOpenSos.classList.add('is-animating');
      notificar(`🚨 Solicitando auxilio: ${tipo}... Enviando ubicación.`);

      setTimeout(() => {
        btnOpenSos.classList.remove('is-animating');
        notificar(`${icono} ${tipo} Asignado: ${detalle}`);
      }, 8000);
    }
  };

  // CARGA DE FOTO DE PERFIL
  if (inputFoto) {
    inputFoto.addEventListener('change', (e) => {
      const archivo = e.target.files[0];
      if (archivo && archivo.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const imagenUrl = event.target.result;
          if (headerImg && headerInitials) {
            headerImg.src = imagenUrl;
            headerImg.classList.remove('hidden');
            headerInitials.classList.add('hidden');
          }
          if (profileImg && profileInitials) {
            profileImg.src = imagenUrl;
            profileImg.classList.remove('hidden');
            profileInitials.classList.add('hidden');
          }
          notificar('📸 ¡Foto de perfil actualizada!');
        };
        reader.readAsDataURL(archivo);
      }
    });
  }
});
