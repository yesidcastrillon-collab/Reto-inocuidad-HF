/* ============================================================================
 * CONFIGURACIÓN DE LA APP  —  Reto Inocuidad HF
 * ----------------------------------------------------------------------------
 * Edita SOLO este archivo para conectar el correo y WhatsApp.
 * No necesitas tocar el resto del código.
 * ==========================================================================*/

const APP_CONFIG = {
  /* ---- Datos generales -------------------------------------------------- */
  institucion: "Reto Inocuidad HF",
  materia: "Inocuidad Alimentaria",
  docente: "Yesid Castrillón",

  // Examen
  totalPreguntas: 20,        // preguntas por intento (mín. 20). El banco tiene 39.
  segundosPorPregunta: 25,   // cronómetro por pregunta
  alertaSonoraDesde: 5,      // empieza a sonar cuando faltan estos segundos
  umbralAprobacion: 80,      // % requerido para APROBAR (>=80 APROBADO, <80 NO APROBADO)

  /* ---- 1) CORREO AUTOMÁTICO AL DOCENTE (EmailJS) ------------------------ */
  /* Crea una cuenta gratis en https://www.emailjs.com/ y completa estas 3
   * claves. El correo se envía solo, sin que el estudiante haga nada.
   * El correo destino se define en la plantilla de EmailJS (To: {{to_email}}).
   */
  email: {
    habilitado: true,
    correoDocente: "yesid.castrillon@gmail.com",
    serviceId: "TU_SERVICE_ID",      // <-- reemplazar
    templateId: "TU_TEMPLATE_ID",    // <-- reemplazar
    publicKey: "TU_PUBLIC_KEY",      // <-- reemplazar
  },

  /* ---- 2) WHATSAPP ------------------------------------------------------ */
  /* numero: en formato internacional sin "+" ni espacios.
   *
   * MODO AUTOMÁTICO (sin clics): usa un webhook/API. La opción gratuita más
   * común es CallMeBot (https://www.callmebot.com/blog/free-api-whatsapp-messages/).
   * Pega tu apikey y se enviará solo. Si lo dejas vacío, se usa el respaldo.
   *
   * MODO RESPALDO (1 clic): si no hay API, se abre WhatsApp con el mensaje
   * ya escrito y el usuario solo presiona "enviar".
   */
  whatsapp: {
    habilitado: true,
    numero: "573163165911",          // +57 316 316 5911
    callMeBotApiKey: "",             // <-- opcional: apikey de CallMeBot para envío automático
    abrirRespaldoSiFalla: true,      // abre wa.me si el automático no está configurado
  },
};
