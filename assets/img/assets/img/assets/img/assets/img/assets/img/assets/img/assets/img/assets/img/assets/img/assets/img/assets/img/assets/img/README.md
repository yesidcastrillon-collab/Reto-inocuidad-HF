# Reto Inocuidad HF — Examen de Inocuidad Alimentaria

App web (HTML/CSS/JS, sin servidor) para un examen interactivo de inocuidad
alimentaria, con cronómetro, imágenes, certificado descargable y envío
automático de resultados al docente.

## Características
1. 20+ preguntas por intento de un banco de 39 (13 temas x 5 niveles).
2. Cronómetro de 25 s por pregunta con alerta sonora en los últimos 5 s.
3. Imagen ilustrativa en cada pregunta.
4. Certificado con logo (>=80% APROBADO, <80% NO APROBADO).
5. WhatsApp con los datos y la calificación a +57 316 316 5911.
6. Correo automático al docente yesid.castrillon@gmail.com.

## Configuración (config.js)
- Correo: crear cuenta en https://www.emailjs.com/ y pegar serviceId, templateId y publicKey.
- WhatsApp: activar CallMeBot (https://www.callmebot.com/blog/free-api-whatsapp-messages/) y pegar el apikey, o usar el botón verde de respaldo.

## Probar localmente
cd reto-inocuidad-hf && python3 -m http.server 8000  ->  http://localhost:8000
