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

  // Lógica para cambiar foto de perfil
  const inputFoto = document.getElementById('input-foto-perfil');
  const headerImg = document.getElementById('header-avatar-img');
  const headerInitials = document.getElementById('header-avatar-initials');
  const profileImg = document.getElementById('profile-avatar-img');
  const profileInitials = document.getElementById('profile-avatar-initials');

  // URL de tu API (Usa localhost en desarrollo, o tu URL de Render/Vercel en producción)
  const API_URL = 'http://localhost:3000/api/chat';

  // Función Notificación Toast
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

  // NAVEGACIÓN ENTRE SECCIONES
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

  // CONFIRMACIÓN DE EMERGENCIA
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

  // CHAT EN TIEMPO REAL E INTEGRACIÓN CON BOT API
  if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const texto = chatInput.value.trim();

      if (texto !== '') {
        // 1. Renderizar mensaje del chofer
        const msgUsuario = document.createElement('div');
        msgUsuario.className = 'bg-orange-500 text-slate-950 p-2.5 rounded-xl font-medium max-w-[85%] ml-auto text-right shadow-sm my-1.5';
        msgUsuario.innerHTML = `<strong class="block text-[10px] text-slate-900 uppercase font-extrabold mb-0.5">Chofer</strong>${texto}`;
        chatBox.appendChild(msgUsuario);

        // Limpiar input y deshabilitar mientras espera
        chatInput.value = '';
        chatInput.disabled = true;
        chatBox.scrollTop = chatBox.scrollHeight;

        // 2. Renderizar un mensaje temporal de "pensando..."
        const msgCargando = document.createElement('div');
        msgCargando.className = 'bg-slate-800 text-slate-300 p-2.5 rounded-xl font-medium max-w-[85%] mr-auto text-left shadow-sm my-1.5 border border-slate-700';
        msgCargando.innerHTML = `<strong class="block text-[10px] text-orange-400 uppercase font-extrabold mb-0.5">Soporte & Base Operativa</strong><span class="animate-pulse">Escribiendo...</span>`;
        chatBox.appendChild(msgCargando);
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
          // 3. Consultar a tu API REST de Gemini
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: texto })
          });

          const data = await response.json();

          // 4. Reemplazar el mensaje de carga con la respuesta real
          if (data.reply) {
            msgCargando.innerHTML = `<strong class="block text-[10px] text-orange-400 uppercase font-extrabold mb-0.5">Soporte & Base Operativa</strong>${data.reply.replace(/\n/g, '<br>')}`;
          } else {
            msgCargando.innerHTML = `<strong class="block text-[10px] text-red-400 uppercase font-extrabold mb-0.5">Soporte & Base Operativa</strong>No se pudo procesar tu novedad en este momento.`;
          }
        } catch (error) {
          console.error('Error al conectar con la API:', error);
          msgCargando.innerHTML = `<strong class="block text-[10px] text-red-400 uppercase font-extrabold mb-0.5">Soporte & Base Operativa</strong>Error de conexión con la base operativa.`;
        } finally {
          // Reactivar input y enfocar
          chatInput.disabled = false;
          chatInput.focus();
          chatBox.scrollTop = chatBox.scrollHeight;
        }
      }
    });
  }

  // SUBIDA Y PROCESAMIENTO DE FOTO DE PERFIL
  if (inputFoto) {
    inputFoto.addEventListener('change', (e) => {
      const archivo = e.target.files[0];

      if (archivo) {
        if (!archivo.type.startsWith('image/')) {
          notificar('❌ Por favor, seleccioná un archivo de imagen válido.');
          return;
        }

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

          notificar('📸 ¡Foto de perfil actualizada con éxito!');
        };

        reader.readAsDataURL(archivo);
      }
    });
  }
});
