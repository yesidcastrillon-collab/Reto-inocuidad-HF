/* ============================================================================
 *  LÓGICA DE LA APLICACIÓN
 * ==========================================================================*/
"use strict";

/* ---------- Estado global ---------- */
const estado = {
  estudiante: { nombre: "", documento: "", grado: "" },
  preguntas: [],         // las 20 seleccionadas para este intento
  indice: 0,
  respuestas: [],        // {tema, correcta:bool}
  correctas: 0,
  bloqueado: false,
  inicio: null,
};

let timer = null;
let segundos = 0;
let audioCtx = null;

/* ---------- Utilidades de pantalla ---------- */
const $ = (id) => document.getElementById(id);
function mostrarPantalla(id) {
  document.querySelectorAll(".pantalla").forEach((p) => p.classList.remove("activa"));
  $(id).classList.add("activa");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ============================================================================
 *  INICIO
 * ==========================================================================*/
function initInicio() {
  $("titulo-materia").textContent = "Examen de " + APP_CONFIG.materia;
  $("subtitulo-inst").textContent = APP_CONFIG.institucion;
  $("info-examen").innerHTML = `
    <span>▪ ${Object.keys(TEMAS).length} temas</span>
    <span>📝 ${APP_CONFIG.totalPreguntas} preguntas</span>
    <span>⏱ ${APP_CONFIG.segundosPorPregunta}s por pregunta</span>
    <span>🎯 Aprueba con ≥ ${APP_CONFIG.umbralAprobacion}%</span>`;

  $("form-inicio").addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = $("nombre").value.trim();
    const documento = $("documento").value.trim();
    const grado = $("grado").value.trim();
    if (nombre.length < 3 || documento.length < 1) {
      $("error-inicio").textContent = "Por favor escribe tu nombre completo y documento.";
      return;
    }
    estado.estudiante = { nombre, documento, grado };
    comenzarExamen();
  });
}

/* ============================================================================
 *  SELECCIÓN DE PREGUNTAS  (20 cubriendo todos los temas y variando dificultad)
 * ==========================================================================*/
function barajar(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function seleccionarPreguntas() {
  const total = Math.min(APP_CONFIG.totalPreguntas, PREGUNTAS.length);
  const porTema = {};
  PREGUNTAS.forEach((p) => {
    (porTema[p.tema] = porTema[p.tema] || []).push(p);
  });

  const seleccion = [];
  // 1) Garantizar al menos una pregunta de cada tema.
  Object.keys(porTema).forEach((t) => {
    const baraja = barajar(porTema[t]);
    seleccion.push(baraja[0]);
  });
  // 2) Completar hasta "total" con el resto, evitando repetir.
  const restantes = barajar(PREGUNTAS.filter((p) => !seleccion.includes(p)));
  for (const p of restantes) {
    if (seleccion.length >= total) break;
    seleccion.push(p);
  }
  // 3) Ordenar por nivel de dificultad ascendente (fácil -> difícil).
  return barajar(seleccion).slice(0, total).sort((a, b) => a.nivel - b.nivel);
}

/* ============================================================================
 *  EXAMEN
 * ==========================================================================*/
function comenzarExamen() {
  estado.preguntas = seleccionarPreguntas();
  estado.indice = 0;
  estado.respuestas = [];
  estado.correctas = 0;
  estado.inicio = new Date();
  mostrarPantalla("pantalla-quiz");
  renderPregunta();
}

function renderPregunta() {
  estado.bloqueado = false;
  const p = estado.preguntas[estado.indice];
  const tema = TEMAS[p.tema];

  $("contador-preguntas").textContent =
    `Pregunta ${estado.indice + 1} de ${estado.preguntas.length}`;
  $("barra-progreso").style.width =
    `${(estado.indice / estado.preguntas.length) * 100}%`;

  const etiqueta = $("etiqueta-tema");
  etiqueta.textContent = `${tema.nombre}  ·  Nivel ${p.nivel}/5`;
  etiqueta.style.background = tema.color + "22";
  etiqueta.style.color = tema.color;

  const img = $("img-pregunta");
  img.src = `assets/img/${p.tema}.svg`;
  img.alt = tema.nombre;

  $("texto-pregunta").textContent = p.pregunta;

  const cont = $("opciones");
  cont.innerHTML = "";
  const letras = ["A", "B", "C", "D", "E"];
  p.opciones.forEach((op, i) => {
    const div = document.createElement("div");
    div.className = "opcion";
    div.innerHTML = `<span class="letra">${letras[i]}</span><span>${op}</span>`;
    div.addEventListener("click", () => seleccionarOpcion(i, div));
    cont.appendChild(div);
  });

  const btn = $("btn-siguiente");
  btn.disabled = true;
  btn.textContent =
    estado.indice === estado.preguntas.length - 1 ? "Finalizar ✓" : "Siguiente ▶";

  iniciarCronometro();
}

function seleccionarOpcion(i, div) {
  if (estado.bloqueado) return;
  document.querySelectorAll(".opcion").forEach((o) => o.classList.remove("sel"));
  div.classList.add("sel");
  div.dataset.elegida = i;
  $("btn-siguiente").disabled = false;
  $("opciones").dataset.elegida = i;
}

/* ---------- Confirmar respuesta y avanzar ---------- */
function confirmarRespuesta(expiroTiempo) {
  if (estado.bloqueado) return;
  estado.bloqueado = true;
  detenerCronometro();

  const p = estado.preguntas[estado.indice];
  const elegidaAttr = $("opciones").dataset.elegida;
  const elegida = elegidaAttr === undefined ? -1 : parseInt(elegidaAttr, 10);
  delete $("opciones").dataset.elegida;

  const opcionesDom = document.querySelectorAll(".opcion");
  opcionesDom.forEach((o, idx) => {
    o.classList.add("bloqueada");
    if (idx === p.correcta) o.classList.add("correcta");
    else if (idx === elegida) o.classList.add("incorrecta");
  });

  const acerto = elegida === p.correcta;
  if (acerto) estado.correctas++;
  estado.respuestas.push({ tema: p.tema, correcta: acerto, expiro: !!expiroTiempo });

  // pequeña pausa para que el estudiante vea la respuesta correcta
  setTimeout(() => {
    if (estado.indice < estado.preguntas.length - 1) {
      estado.indice++;
      renderPregunta();
    } else {
      finalizarExamen();
    }
  }, 1100);
}

/* ============================================================================
 *  CRONÓMETRO + SONIDO
 * ==========================================================================*/
function iniciarCronometro() {
  detenerCronometro();
  segundos = APP_CONFIG.segundosPorPregunta;
  const arco = $("crono-arco");
  const crono = $("cronometro");
  crono.classList.remove("alerta");
  arco.style.stroke = ""; // reset
  actualizarCronoUI();

  timer = setInterval(() => {
    segundos--;
    actualizarCronoUI();

    if (segundos <= APP_CONFIG.alertaSonoraDesde && segundos > 0) {
      crono.classList.add("alerta");
      beep(880, 0.12);            // pitido de alerta
    }
    if (segundos <= 0) {
      detenerCronometro();
      beepLargo();                // alarma final
      confirmarRespuesta(true);   // tiempo agotado -> se confirma lo que haya
    }
  }, 1000);
}

function actualizarCronoUI() {
  $("crono-num").textContent = segundos;
  const frac = segundos / APP_CONFIG.segundosPorPregunta;
  $("crono-arco").style.strokeDashoffset = String(100 - frac * 100);
}

function detenerCronometro() {
  if (timer) { clearInterval(timer); timer = null; }
}

/* ---------- Sonidos con Web Audio API (sin archivos) ---------- */
function getAudio() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch (e) { return null; }
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
function beep(freq, dur) {
  const ctx = getAudio();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + dur + 0.02);
}
function beepLargo() {
  beep(440, 0.5);
  setTimeout(() => beep(330, 0.5), 200);
}

/* ============================================================================
 *  FINALIZAR + RESULTADO + CERTIFICADO
 * ==========================================================================*/
function finalizarExamen() {
  $("barra-progreso").style.width = "100%";
  const total = estado.preguntas.length;
  const porcentaje = Math.round((estado.correctas / total) * 100);
  const aprobado = porcentaje >= APP_CONFIG.umbralAprobacion;

  // Badge + textos
  const badge = $("veredicto-badge");
  badge.className = "veredicto-badge " + (aprobado ? "ok" : "no");
  badge.textContent = aprobado ? "✓" : "✕";
  $("resultado-titulo").textContent = aprobado ? "¡APROBADO!" : "NO APROBADO";
  $("resultado-titulo").style.color = aprobado ? "#16a34a" : "#dc2626";
  $("resultado-detalle").textContent =
    `${estado.estudiante.nombre} — ${estado.correctas} de ${total} correctas (${porcentaje}%)`;

  const resultado = {
    ...estado.estudiante,
    correctas: estado.correctas,
    total,
    porcentaje,
    veredicto: aprobado ? "APROBADO" : "NO APROBADO",
    fecha: new Date().toLocaleString("es-CO"),
  };

  mostrarPantalla("pantalla-resultado");
  dibujarCertificado(resultado);

  // Botones
  $("btn-descargar").onclick = descargarCertificado;
  $("btn-whatsapp").onclick = () => enviarWhatsApp(resultado, true);
  $("btn-reiniciar").onclick = () => location.reload();

  // 5 y 6: envíos automáticos (sin que el estudiante haga nada)
  enviarNotificaciones(resultado);
}

/* ---------- Certificado en Canvas (con logo real) ---------- */
function dibujarCertificado(r) {
  const canvas = $("certificado");
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  const aprobado = r.veredicto === "APROBADO";
  const colorPrincipal = aprobado ? "#16a34a" : "#dc2626";

  // Fondo
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);
  // Marco
  ctx.strokeStyle = colorPrincipal;
  ctx.lineWidth = 10;
  ctx.strokeRect(25, 25, W - 50, H - 50);
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 2;
  ctx.strokeRect(45, 45, W - 90, H - 90);

  const centro = W / 2;
  ctx.textAlign = "center";

  function texto(t, y, size, color, bold, font) {
    ctx.fillStyle = color;
    ctx.font = `${bold ? "bold " : ""}${size}px ${font || "Georgia, serif"}`;
    ctx.fillText(t, centro, y);
  }

  // Logo (se dibuja cuando carga)
  const logo = new Image();
  logo.onload = () => {
    ctx.drawImage(logo, centro - 55, 70, 110, 110);
    pintarTextos();
  };
  logo.onerror = pintarTextos; // si no hay logo, igual pinta los textos
  logo.src = "assets/logo.svg";

  function pintarTextos() {
    texto(APP_CONFIG.institucion.toUpperCase(), 215, 30, "#334155", true, "Arial");
    texto("CERTIFICADO DE CALIFICACIÓN", 265, 42, "#0f172a", true, "Georgia, serif");
    texto(APP_CONFIG.materia, 305, 26, "#64748b", false, "Arial");

    texto("Se certifica que", 365, 24, "#475569", false, "Arial");
    texto(r.nombre, 410, 44, "#1e40af", true, "Georgia, serif");
    texto(
      `Documento/Lista: ${r.documento}${r.grado ? "   ·   Grado: " + r.grado : ""}`,
      445, 22, "#64748b", false, "Arial"
    );

    texto(
      `obtuvo ${r.correctas} de ${r.total} respuestas correctas`,
      500, 26, "#334155", false, "Arial"
    );

    // Calificación grande
    texto(`${r.porcentaje}%`, 565, 60, colorPrincipal, true, "Arial");

    // Veredicto
    ctx.fillStyle = colorPrincipal;
    const bw = 360, bh = 64, bx = centro - bw / 2, by = 590;
    redondeado(ctx, bx, by, bw, bh, 14);
    ctx.fill();
    texto(r.veredicto, 633, 40, "#ffffff", true, "Arial");

    // Pie
    texto(`Fecha: ${r.fecha}`, 678, 18, "#94a3b8", false, "Arial");
  }
}
function redondeado(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function descargarCertificado() {
  const canvas = $("certificado");
  const link = document.createElement("a");
  const nombre = estado.estudiante.nombre.replace(/\s+/g, "_");
  link.download = `Certificado_${nombre}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/* ============================================================================
 *  5 y 6: NOTIFICACIONES  (correo automático + WhatsApp)
 * ==========================================================================*/
function enviarNotificaciones(r) {
  // Correo automático al docente — sin acción del estudiante
  if (APP_CONFIG.email.habilitado) {
    enviarCorreo(r)
      .then(() => actualizarEstado("✓ Resultado enviado por correo al docente."))
      .catch((err) => actualizarEstado("⚠️ Correo no enviado (revisar config EmailJS): " + err));
  }
  // WhatsApp automático (si hay API) o respaldo
  if (APP_CONFIG.whatsapp.habilitado) {
    enviarWhatsApp(r, false);
  }
}

let _estadoTxt = "";
function actualizarEstado(linea) {
  _estadoTxt += (_estadoTxt ? "
" : "") + linea;
  $("estado-envios").textContent = _estadoTxt;
}

function mensajeResultado(r) {
  return (
    `▪ *Resultado de Examen — ${APP_CONFIG.materia}*
` +
    `Institución: ${APP_CONFIG.institucion}
` +
    `Estudiante: ${r.nombre}
` +
    `Documento/Lista: ${r.documento}
` +
    (r.grado ? `Grado: ${r.grado}
` : "") +
    `Calificación: ${r.correctas}/${r.total} (${r.porcentaje}%)
` +
    `Resultado: ${r.veredicto}
` +
    `Fecha: ${r.fecha}`
  );
}

/* ---------- Correo vía EmailJS ---------- */
function enviarCorreo(r) {
  return new Promise((resolve, reject) => {
    const cfg = APP_CONFIG.email;
    if (!window.emailjs) return reject("librería EmailJS no cargó");
    if (cfg.serviceId.startsWith("TU_") || cfg.publicKey.startsWith("TU_")) {
      return reject("faltan claves de EmailJS");
    }
    try {
      emailjs.init({ publicKey: cfg.publicKey });
      const params = {
        to_email: cfg.correoDocente,
        docente: APP_CONFIG.docente,
        materia: APP_CONFIG.materia,
        institucion: APP_CONFIG.institucion,
        estudiante: r.nombre,
        documento: r.documento,
        grado: r.grado || "—",
        correctas: r.correctas,
        total: r.total,
        porcentaje: r.porcentaje,
        veredicto: r.veredicto,
        fecha: r.fecha,
        mensaje: mensajeResultado(r),
      };
      emailjs.send(cfg.serviceId, cfg.templateId, params)
        .then(() => resolve(), (e) => reject((e && e.text) || "error de envío"));
    } catch (e) {
      reject(e.message || "error inesperado");
    }
  });
}

/* ---------- WhatsApp ---------- */
function enviarWhatsApp(r, forzarApertura) {
  const cfg = APP_CONFIG.whatsapp;
  const texto = mensajeResultado(r);

  // Modo automático con CallMeBot (si hay apikey)
  if (cfg.callMeBotApiKey && !forzarApertura) {
    const url =
      `https://api.callmebot.com/whatsapp.php?phone=${cfg.numero}` +
      `&text=${encodeURIComponent(texto)}&apikey=${cfg.callMeBotApiKey}`;
    fetch(url, { mode: "no-cors" })
      .then(() => actualizarEstado("✓ Resultado enviado por WhatsApp (automático)."))
      .catch(() => {
        actualizarEstado("⚠️ WhatsApp automático falló; usa el botón verde.");
      });
    return;
  }

  // Respaldo: abrir WhatsApp con el mensaje listo (1 clic del usuario)
  if (forzarApertura || cfg.abrirRespaldoSiFalla) {
    const wa = `https://wa.me/${cfg.numero}?text=${encodeURIComponent(texto)}`;
    if (forzarApertura) {
      window.open(wa, "_blank");
    } else {
      actualizarEstado("ℹ️ Para WhatsApp automático configura una API; mientras tanto usa el botón verde.");
    }
  }
}

/* ---------- Arranque ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initInicio();
  $("btn-siguiente").addEventListener("click", () => confirmarRespuesta(false));
});
