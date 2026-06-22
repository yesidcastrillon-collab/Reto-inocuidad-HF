/* ============================================================================
 * BANCO DE PREGUNTAS  —  INOCUIDAD ALIMENTARIA  (Reto Inocuidad HF)
 * 13 temas, 5 niveles de dificultad (1=fácil ... 5=difícil), 39 preguntas.
 * En cada intento se eligen 20 garantizando cobertura de todos los temas.
 *
 * Estructura de cada pregunta:
 *   tema      : clave del tema (define la imagen ilustrativa)
 *   nivel     : 1 a 5
 *   pregunta  : enunciado
 *   opciones  : arreglo de respuestas
 *   correcta  : índice (0-based) de la opción correcta
 * ==========================================================================*/

const TEMAS = {
  bpm:                  { nombre: "Buenas Prácticas de Manufactura (BPM)", color: "#2563eb" },
  practicas_higienicas: { nombre: "Prácticas Higiénicas",                  color: "#0891b2" },
  educacion_sanitaria:  { nombre: "Educación Sanitaria",                   color: "#7c3aed" },
  haccp:                { nombre: "HACCP",                                 color: "#ea580c" },
  limpieza:             { nombre: "Limpieza y Desinfección",               color: "#0d9488" },
  cadena_frio:          { nombre: "Cadena de Frío",                        color: "#0284c7" },
  contaminacion_cruzada:{ nombre: "Contaminación Cruzada",                 color: "#dc2626" },
  plagas:               { nombre: "Manejo de Plagas",                      color: "#65a30d" },
  higiene_personal:     { nombre: "Higiene del Personal",                  color: "#db2777" },
  trazabilidad:         { nombre: "Trazabilidad",                          color: "#9333ea" },
  agua:                 { nombre: "Agua Potable",                          color: "#0ea5e9" },
  residuos:             { nombre: "Manejo de Residuos Sólidos",            color: "#16a34a" },
  eta:                  { nombre: "Enfermedades Transmitidas por Alimentos (ETA)", color: "#b91c1c" },
};

const PREGUNTAS = [
  /* ------------------------------- BPM ---------------------------------- */
  { tema:"bpm", nivel:1, pregunta:"¿Qué significan las siglas BPM en inocuidad alimentaria?",
    opciones:["Buenas Prácticas de Manufactura","Bases Para Manipular","Buen Proceso Microbiológico","Balance de Productos y Materiales"], correcta:0 },
  { tema:"bpm", nivel:3, pregunta:"¿Cuál es el principal objetivo de las BPM?",
    opciones:["Aumentar la producción al máximo","Garantizar alimentos inocuos y aptos para el consumo","Reducir el precio de los alimentos","Decorar la presentación del producto"], correcta:1 },
  { tema:"bpm", nivel:5, pregunta:"Dentro de las BPM, ¿qué condición debe cumplir el diseño de las instalaciones de procesamiento?",
    opciones:["Permitir el flujo del proceso evitando contaminación cruzada","Tener la mayor cantidad de equipos posible","Estar pintadas de colores oscuros","Ubicarse cerca de zonas de basura"], correcta:0 },

  /* -------------------------- PRÁCTICAS HIGIÉNICAS ---------------------- */
  { tema:"practicas_higienicas", nivel:1, pregunta:"¿Cuándo debe lavarse las manos un manipulador de alimentos?",
    opciones:["Solo al iniciar la jornada","Antes de manipular alimentos y después de ir al baño","Únicamente cuando se ven sucias","Una vez al día"], correcta:1 },
  { tema:"practicas_higienicas", nivel:2, pregunta:"¿Cuánto tiempo, como mínimo, debe durar un correcto lavado de manos?",
    opciones:["2 segundos","5 segundos","20 segundos","No importa el tiempo"], correcta:2 },
  { tema:"practicas_higienicas", nivel:4, pregunta:"¿Cuál de las siguientes es una práctica higiénica INCORRECTA al manipular alimentos?",
    opciones:["Usar tapabocas y cofia","Probar la comida con el mismo utensilio que se sirve","Lavarse las manos al cambiar de tarea","Mantener las uñas cortas y limpias"], correcta:1 },

  /* -------------------------- EDUCACIÓN SANITARIA ----------------------- */
  { tema:"educacion_sanitaria", nivel:1, pregunta:"¿Para qué sirve la educación sanitaria del personal?",
    opciones:["Para que conozcan y apliquen prácticas seguras de manipulación","Para aumentar su salario","Para decorar el establecimiento","Para vender más rápido"], correcta:0 },
  { tema:"educacion_sanitaria", nivel:3, pregunta:"¿Cada cuánto se recomienda capacitar al personal manipulador de alimentos?",
    opciones:["Nunca, basta con contratarlos","De forma periódica y continua","Solo si ocurre un brote","Cada 10 años"], correcta:1 },
  { tema:"educacion_sanitaria", nivel:5, pregunta:"¿Qué documento respalda que un manipulador recibió formación en inocuidad?",
    opciones:["La factura de compra","El certificado o constancia de capacitación","El recibo de servicios","El menú del día"], correcta:1 },

  /* ------------------------------- HACCP -------------------------------- */
  { tema:"haccp", nivel:2, pregunta:"¿Qué evalúa principalmente el sistema HACCP?",
    opciones:["El sabor de los alimentos","Los peligros y puntos críticos de control en el proceso","El color del empaque","El costo de producción"], correcta:1 },
  { tema:"haccp", nivel:4, pregunta:"¿Qué es un Punto Crítico de Control (PCC)?",
    opciones:["Un punto donde se puede aplicar control para prevenir o eliminar un peligro","El lugar donde se almacena el dinero","La entrada principal de la fábrica","El punto de venta al cliente"], correcta:0 },
  { tema:"haccp", nivel:5, pregunta:"¿Cuál es el primer principio del sistema HACCP?",
    opciones:["Establecer límites críticos","Realizar un análisis de peligros","Llevar registros","Verificar el sistema"], correcta:1 },

  /* ----------------------- LIMPIEZA Y DESINFECCIÓN ---------------------- */
  { tema:"limpieza", nivel:1, pregunta:"¿Cuál es la diferencia entre limpiar y desinfectar?",
    opciones:["Son exactamente lo mismo","Limpiar elimina suciedad visible; desinfectar reduce los microorganismos","Desinfectar solo aplica al piso","Limpiar mata todos los virus"], correcta:1 },
  { tema:"limpieza", nivel:3, pregunta:"¿Cuál es el orden correcto de un procedimiento de limpieza y desinfección?",
    opciones:["Desinfectar y luego limpiar","Limpiar, enjuagar, desinfectar y secar","Solo enjuagar con agua","Aplicar desinfectante sobre la suciedad"], correcta:1 },
  { tema:"limpieza", nivel:4, pregunta:"¿Qué producto se usa comúnmente para desinfectar superficies en contacto con alimentos?",
    opciones:["Aceite de cocina","Solución de hipoclorito de sodio en concentración adecuada","Detergente para ropa","Agua hirviendo solamente"], correcta:1 },

  /* --------------------------- CADENA DE FRÍO --------------------------- */
  { tema:"cadena_frio", nivel:1, pregunta:"¿Para qué sirve la cadena de frío?",
    opciones:["Para congelar siempre todos los alimentos","Para mantener los alimentos a temperaturas seguras y frenar el crecimiento microbiano","Para enfriar la cocina","Para ahorrar energía"], correcta:1 },
  { tema:"cadena_frio", nivel:3, pregunta:"¿A qué temperatura debe mantenerse normalmente la refrigeración de alimentos?",
    opciones:["Entre 0 °C y 4 °C","Entre 10 °C y 15 °C","Entre 20 °C y 25 °C","Por encima de 30 °C"], correcta:0 },
  { tema:"cadena_frio", nivel:5, pregunta:"La 'zona de peligro' de temperatura, donde las bacterias se multiplican rápidamente, está aproximadamente entre:",
    opciones:["−18 °C y 0 °C","5 °C y 60 °C","60 °C y 100 °C","100 °C y 150 °C"], correcta:1 },

  /* ----------------------- CONTAMINACIÓN CRUZADA ------------------------ */
  { tema:"contaminacion_cruzada", nivel:1, pregunta:"¿Qué es la contaminación cruzada?",
    opciones:["El paso de contaminantes de un alimento o superficie a otro","Cocinar dos alimentos a la vez","Mezclar dos sabores","Lavar los platos con agua fría"], correcta:0 },
  { tema:"contaminacion_cruzada", nivel:3, pregunta:"¿Cuál es una buena práctica para evitar la contaminación cruzada?",
    opciones:["Usar la misma tabla para carne cruda y verduras listas para comer","Separar alimentos crudos de los cocidos y usar tablas de distinto color","Guardar la carne cruda encima de los alimentos cocidos","Reutilizar el cuchillo sin lavarlo"], correcta:1 },
  { tema:"contaminacion_cruzada", nivel:5, pregunta:"En un refrigerador, ¿dónde deben colocarse las carnes crudas para evitar contaminación cruzada?",
    opciones:["En los estantes superiores","En la parte inferior, debajo de los alimentos listos para consumir","Junto a las frutas","En la puerta"], correcta:1 },

  /* --------------------------- MANEJO DE PLAGAS ------------------------- */
  { tema:"plagas", nivel:1, pregunta:"¿Cuáles son ejemplos de plagas en un establecimiento de alimentos?",
    opciones:["Roedores, insectos y aves","Clientes y proveedores","Empleados","Productos vencidos"], correcta:0 },
  { tema:"plagas", nivel:3, pregunta:"¿Cuál es la mejor estrategia para el manejo de plagas?",
    opciones:["Aplicar veneno constantemente sobre los alimentos","La prevención: evitar el ingreso y eliminar refugios y alimento","Ignorarlas si son pocas","Dejar puertas abiertas para que salgan"], correcta:1 },
  { tema:"plagas", nivel:4, pregunta:"¿Dónde NO deben aplicarse plaguicidas en una planta de alimentos?",
    opciones:["Directamente sobre alimentos o superficies de contacto","En el exterior del edificio","En desagües según el plan","En zonas controladas y señalizadas"], correcta:0 },

  /* -------------------------- HIGIENE DEL PERSONAL ---------------------- */
  { tema:"higiene_personal", nivel:1, pregunta:"¿Qué debe hacer un manipulador con su cabello durante la jornada?",
    opciones:["Dejarlo suelto","Mantenerlo recogido y cubierto con cofia o malla","Peinarlo sobre los alimentos","No importa"], correcta:1 },
  { tema:"higiene_personal", nivel:2, pregunta:"¿Qué debe hacer un manipulador de alimentos que está enfermo con gripa o diarrea?",
    opciones:["Seguir trabajando normalmente","Informar a su supervisor y abstenerse de manipular alimentos","Usar más perfume","Trabajar con guantes y ya"], correcta:1 },
  { tema:"higiene_personal", nivel:4, pregunta:"¿Cuál de los siguientes está PROHIBIDO al manipular alimentos por higiene personal?",
    opciones:["Usar uniforme limpio","Usar anillos, relojes y joyas","Lavarse las manos","Usar tapabocas"], correcta:1 },

  /* ----------------------------- TRAZABILIDAD --------------------------- */
  { tema:"trazabilidad", nivel:2, pregunta:"¿Qué permite la trazabilidad de un alimento?",
    opciones:["Seguir su recorrido desde el origen hasta el consumidor","Hacerlo más sabroso","Reducir su peso","Cambiar su color"], correcta:0 },
  { tema:"trazabilidad", nivel:4, pregunta:"¿Por qué es importante la trazabilidad ante un problema de inocuidad?",
    opciones:["Para subir los precios","Para identificar y retirar rápidamente los lotes afectados","Para premiar a los empleados","No tiene importancia"], correcta:1 },
  { tema:"trazabilidad", nivel:5, pregunta:"¿Qué información suele registrarse para garantizar la trazabilidad?",
    opciones:["Solo el nombre del producto","Lote, fecha, proveedor y destino del producto","El gusto del cliente","El clima del día"], correcta:1 },

  /* ------------------------------ AGUA POTABLE -------------------------- */
  { tema:"agua", nivel:1, pregunta:"¿Qué es el agua potable?",
    opciones:["Agua apta para el consumo humano, libre de contaminantes","Agua de cualquier río","Agua con jabón","Agua hervida una sola vez al año"], correcta:0 },
  { tema:"agua", nivel:3, pregunta:"¿Por qué el agua usada en la producción de alimentos debe ser potable?",
    opciones:["Para que el alimento sepa mejor","Porque el agua contaminada puede transmitir enfermedades a los alimentos","Para gastar más agua","Porque es más barata"], correcta:1 },
  { tema:"agua", nivel:5, pregunta:"¿Qué sustancia se usa comúnmente para desinfectar el agua de consumo?",
    opciones:["Azúcar","Cloro (en dosis adecuada)","Aceite","Vinagre solamente"], correcta:1 },

  /* ----------------------- MANEJO DE RESIDUOS SÓLIDOS ------------------- */
  { tema:"residuos", nivel:1, pregunta:"¿Cómo deben mantenerse los recipientes de basura en un área de alimentos?",
    opciones:["Abiertos y a la vista","Tapados, identificados y de fácil limpieza","Sin bolsa","Junto a los alimentos preparados"], correcta:1 },
  { tema:"residuos", nivel:3, pregunta:"¿Por qué es importante el manejo adecuado de los residuos sólidos?",
    opciones:["Para evitar que atraigan plagas y contaminen los alimentos","Para decorar la cocina","Para venderlos","No es importante"], correcta:0 },
  { tema:"residuos", nivel:4, pregunta:"¿Con qué frecuencia deben retirarse los residuos de las áreas de manipulación de alimentos?",
    opciones:["Una vez por semana","Las veces necesarias para evitar acumulación, sin que se desborden","Una vez al mes","Nunca"], correcta:1 },

  /* -------------------------------- ETA --------------------------------- */
  { tema:"eta", nivel:1, pregunta:"¿Qué significan las siglas ETA?",
    opciones:["Enfermedades Transmitidas por Alimentos","Equipo Técnico de Aseo","Empresa de Transporte Alimentario","Examen Total de Alimentos"], correcta:0 },
  { tema:"eta", nivel:3, pregunta:"¿Cuál de los siguientes es un síntoma común de una ETA?",
    opciones:["Mejora de la visión","Diarrea, vómito y dolor abdominal","Aumento de estatura","Pérdida del cabello inmediata"], correcta:1 },
  { tema:"eta", nivel:5, pregunta:"¿Cuál de las siguientes es una bacteria que causa frecuentemente ETA?",
    opciones:["Salmonella","Lactobacillus de yogur","Levadura de pan","Clorofila"], correcta:0 },
];
