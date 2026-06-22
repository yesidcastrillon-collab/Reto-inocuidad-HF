# Reto Inocuidad HF — Examen de Inocuidad Alimentaria

App web (HTML/CSS/JS, sin servidor) para un examen interactivo de inocuidad
alimentaria, con cronómetro, imágenes, certificado descargable y envío
automático de resultados al docente.

## ✨ Características

1. **20+ preguntas por intento** tomadas de un banco de **39** que cubre **13
   temas** con **5 niveles de dificultad**:
   BPM, Prácticas Higiénicas, Educación Sanitaria, HACCP, Limpieza y
   Desinfección, Cadena de Frío, Contaminación Cruzada, Manejo de Plagas,
   Higiene del Personal, Trazabilidad, Agua Potable, Manejo de Residuos Sólidos
   y Enfermedades Transmitidas por Alimentos (ETA).
2. **Cronómetro de 25 s por pregunta** con **alerta sonora** en los últimos 5 s
   y alarma final (Web Audio API, sin archivos de audio).
3. **Imagen ilustrativa** en cada pregunta (según el tema).
4. **Certificado de calificación** con logo, descargable como PNG:
   - **≥ 80 %** de aciertos → **APROBADO**
   - **< 80 %** → **NO APROBADO**
5. **WhatsApp**: envía los datos del estudiante y la calificación a
   **+57 316 316 5911**.
6. **Correo automático** al docente **yesid.castrillon@gmail.com** sin que el
   estudiante haga nada.

## ▶️ Cómo probar localmente

Es un sitio estático. Ábrelo con cualquier servidor estático, por ejemplo:

```bash
cd reto-inocuidad-hf
python3 -m http.server 8000
# luego abre http://localhost:8000
```

> Conviene servirlo por HTTP (no abrir el archivo con `file://`) para que el
> sonido y los envíos funcionen sin restricciones del navegador.

También puedes publicarlo gratis con **GitHub Pages** (Settings → Pages →
rama `main`, carpeta raíz).

---

## ⚙️ Configuración (archivo `config.js`)

Todo lo que debes ajustar está en **`config.js`**. No toques el resto del código.

### Personalización básica
- `institucion`, `materia`, `docente`
- `totalPreguntas` (por defecto 20), `segundosPorPregunta` (25),
  `umbralAprobacion` (80).

### 1) Correo automático al docente (EmailJS)
El correo se envía **solo**, sin acción del estudiante. Pasos:

1. Crea una cuenta gratuita en <https://www.emailjs.com/>.
2. Agrega un **Email Service** (p. ej. Gmail) → copia el **Service ID**.
3. Crea un **Email Template**. En el campo **To Email** pon `{{to_email}}`.
   En el cuerpo puedes usar: `{{estudiante}}`, `{{documento}}`, `{{grado}}`,
   `{{correctas}}`, `{{total}}`, `{{porcentaje}}`, `{{veredicto}}`,
   `{{fecha}}`, `{{materia}}`, `{{institucion}}` o `{{mensaje}}` (texto ya armado).
   Copia el **Template ID**.
4. En **Account → API Keys** copia tu **Public Key**.
5. Pega los tres valores en `config.js`.

### 2) WhatsApp a +57 316 316 5911

**A. Automático (sin clics) — CallMeBot (gratis):** sigue la activación en
<https://www.callmebot.com/blog/free-api-whatsapp-messages/> y pega el `apikey`
en `config.js` (`callMeBotApiKey`).

**B. Respaldo (1 clic):** si no configuras una API, el botón verde abre WhatsApp
con el mensaje ya escrito; solo hay que presionar enviar.

> ⚠️ WhatsApp **no permite** envíos 100 % automáticos desde el navegador sin un
> servicio intermediario. Alternativas profesionales: Twilio o la API oficial de
> WhatsApp Business.

---

## 🖼️ Reemplazar el logo y las imágenes

- **Logo real:** reemplaza `assets/logo.svg` por tu archivo (mismo nombre).
- **Imágenes de preguntas:** están en `assets/img/<tema>.svg`. Puedes
  sustituirlas por fotos reales conservando el nombre del tema.

## 📝 Editar / agregar preguntas

Edita `data/questions.js`. Cada pregunta:

```js
{ tema:"haccp", nivel:3, pregunta:"…",
  opciones:["A","B","C","D"], correcta:1 }  // correcta = índice 0-based
```

`tema` debe coincidir con una clave del objeto `TEMAS`.
