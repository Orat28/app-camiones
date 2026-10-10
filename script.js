// Lógica de interacción para la App RutaAssist

document.addEventListener('DOMContentLoaded', () => {
  const btnSos = document.getElementById('btn-sos');
  const btnDucha = document.getElementById('btn-ducha');
  const btnComida = document.getElementById('btn-comida');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatBox = document.getElementById('chat-box');
  const notification = document.getElementById('notification');

  function notificar(mensaje) {
    notification.innerText = mensaje;
    notification.classList.remove('hidden');
    notification.classList.add('notif-active');

    setTimeout(() => {
      notification.classList.add('hidden');
      notification.classList.remove('notif-active');
    }, 3500);
  }

  // EVENTO CON ANIMACIÓN DE CAMIÓN (8 SEGUNDOS)
  if (btnSos) {
    btnSos.addEventListener('click', () => {
      // Evitamos disparar múltiples animaciones simultáneas
      if (btnSos.classList.contains('is-animating')) return;

      btnSos.classList.add('is-animating');
      notificar('🚛 Procesando solicitud de auxilio... El camión de asistencia está en camino.');

      // Retiramos la clase al finalizar los 8s para poder reiniciarla después
      setTimeout(() => {
        btnSos.classList.remove('is-animating');
        notificar('✅ ¡Grúa/Auxilio asignado con éxito!');
      }, 8000);
    });
  }

  // Resto de listeners...
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