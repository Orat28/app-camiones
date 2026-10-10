document.addEventListener('DOMContentLoaded', () => {
  const btnOpenSos = document.getElementById('btn-open-sos');
  const btnCloseSos = document.getElementById('btn-close-sos');
  const modalSos = document.getElementById('modal-sos');
  const btnDucha = document.getElementById('btn-ducha');
  const btnComida = document.getElementById('btn-comida');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatBox = document.getElementById('chat-box');
  const notification = document.getElementById('notification');

  // Función Global para Notificaciones Toast
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

  // NAVEGACIÓN ENTRE PANTALLAS (TABS)
  window.cambiarSeccion = function(idSeccion) {
    document.querySelectorAll('.section-view').forEach(sec => sec.classList.add('hidden'));

    const seccionActiva = document.getElementById(idSeccion);
    if (seccionActiva) {
      seccionActiva.classList.remove('hidden');
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('text-orange-600', 'font-bold');
      btn.classList.add('text-gray-400');
    });

    const btnNavActivo = document.getElementById(`nav-${idSeccion}`);
    if (btnNavActivo) {
      btnNavActivo.classList.remove('text-gray-400');
      btnNavActivo.classList.add('text-orange-600', 'font-bold');
    }
  };

  // CONTROL DEL MODAL DE SOS
  if (btnOpenSos && modalSos) {
    btnOpenSos.addEventListener('click', () => {
      modalSos.classList.remove('hidden');
    });
  }

  if (btnCloseSos && modalSos) {
    btnCloseSos.addEventListener('click', () => {
      modalSos.classList.add('hidden');
    });
  }

  // CONFIRMACIÓN Y DISPARO DE EMERGENCIA
  window.confirmarAuxilio = function(tipo, icono, detalle) {
    modalSos.classList.add('hidden');

    if (btnOpenSos && !btnOpenSos.classList.contains('is-animating')) {
      btnOpenSos.classList.add('is-animating');

      notificar(`🚨 Solicitando auxilio: ${tipo}... Enviando coordenadas GPS.`);

      setTimeout(() => {
        btnOpenSos.classList.remove('is-animating');
        notificar(`${icono} ${tipo} Asignado: ${detalle}`);
      }, 8000);
    }
  };

  // ACCIONES RÁPIDAS
  if (btnDucha) {
    btnDucha.addEventListener('click', () => {
      notificar('🚿 Ducha reservada en Parador YPF El Cruce - Turno: 20:30 hs.');
    });
  }

  if (btnComida) {
    btnComida.addEventListener('click', () => {
      notificar('🍔 Pedido enviado. Estará listo en Parador YPF a las 21:00 hs.');
    });
  }

  // CHAT EN TIEMPO REAL CON LA BASE
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const texto = chatInput.value.trim();

      if (texto !== '') {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'bg-orange-500 text-white p-2.5 rounded-2xl shadow-xs max-w-[85%] ml-auto text-right';
        msgDiv.innerHTML = `<strong class="block text-[10px] text-orange-100 uppercase font-bold mb-0.5">Chofer</strong>${texto}`;

        chatBox.appendChild(msgDiv);
        chatInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    });
  }
});
