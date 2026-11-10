# Hotel Atlántico · Web informativa

Web de una sola página para el **Hotel Atlántico**, hecha con HTML, CSS y JavaScript sin librerías.
Este documento explica qué hay, cómo está organizado y cómo abrirlo, para que el siguiente desarrollador pueda continuar sin contactar con el autor.

> Proyecto personal de práctica, hecho por mi cuenta y fuera de cualquier curso. El hotel y todos sus datos de contacto son **ficticios**. La web no envía correos ni guarda datos.

---

## 1. Nombre del proyecto

**Hotel Atlántico · Web informativa** (carpeta `hotel-atlantico`).

## 2. Descripción del Hotel Atlántico

Hotel de **cuatro estrellas frente al mar en A Coruña (Galicia)**:

- 28 habitaciones de tres tipos.
- Restaurante propio de cocina gallega.
- Terraza con vistas al océano.
- Atención personalizada, recepción 24 horas, público nacional e internacional.

La dirección quiere transmitir tranquilidad y exclusividad, calidad y profesionalidad, cercanía al cliente y una experiencia ligada al mar y a Galicia.

### Información comercial oficial (usada en la web)

| Servicio | Información |
|---|---|
| Habitación estándar | Desde 95 €/noche |
| Habitación superior | Desde 135 €/noche |
| Suite con vistas al mar | Desde 185 €/noche |
| Desayuno | 15 €/persona |
| Restaurante | Cocina gallega |
| Check-in / Check-out | Desde las 15:00 / hasta las 12:00 |
| Recepción | 24 horas |
| Wi-Fi | Gratuito |
| Parking | 15 €/día, sujeto a disponibilidad |
| Mascotas | No admitidas |

Precios orientativos, por habitación y noche, con IVA incluido.

**Contacto (ficticio):** Avenida del Mar, 25, A Coruña · +34 981 000 000 · reservas@hotelatlantico.example

### Paleta corporativa

| Nombre | Color | Variable CSS |
|---|---|---|
| Azul océano | `#123B50` | `--color-ocean` |
| Champán | `#D5B98C` | `--color-champagne` |
| Marfil | `#F5F2EB` | `--color-ivory` |
| Grafito | `#263238` | `--color-graphite` |

## 3. Objetivo de la web

Presentar el hotel y animar al visitante a **consultar disponibilidad**. Es una web informativa:

- Muestra las habitaciones, los servicios, el restaurante y los datos de contacto.
- Todos los botones «Consultar disponibilidad» abren un formulario de consulta.
- **No hay motor de reservas ni pagos.** El formulario se valida en el navegador y muestra una confirmación, pero no se envía a ningún sitio.

## 4. Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica (`header`, `main`, `section`, `footer`), ventanas emergentes con `<dialog>` y plantilla `<template>` |
| CSS3 | Variables, Flexbox, Grid y `@media` (diseño *mobile-first*), `prefers-reduced-motion` |
| JavaScript (ES6+) | Sin librerías ni frameworks: `IntersectionObserver`, `showModal()`, validación del formulario |
| Git | Control de versiones (5 versiones, ver apartado 9) |

- No hay dependencias, `npm`, paso de compilación ni servidor propio.
- Las fuentes son del sistema (Segoe UI, Georgia…): la página no hace peticiones externas, salvo el enlace a Google Maps del pie.

## 5. Estructura de carpetas

```
hotel-atlantico/
├── index.html            # Toda la página: cabecera, secciones, fichas, formulario y pie
├── styles.css            # Todos los estilos (variables, componentes y @media al final)
├── script.js             # Comportamiento: cabecera, fichas de habitaciones y formulario
├── README.md             # Este documento
├── .gitignore            # Excluye carpetas de herramientas locales (.claude, .agents, graphify-out…)
└── assets/
    └── images/
        ├── terraza.jpg               # Foto de portada (hero)
        ├── imagen-principal.jpg      # Fachada del hotel (presentación)
        ├── habitacion-estandar.jpg
        ├── habitacion-superior.jpg
        ├── suite-vistas-mar.jpg
        └── restaurante.jpg
```

### Secciones de `index.html`

| Ancla | Contenido |
|---|---|
| `#inicio` | Portada a pantalla completa con titular y botón |
| `#el-hotel` | Presentación del hotel |
| `#habitaciones` | 3 tarjetas de habitación y sus fichas (`#room-estandar`, `#room-superior`, `#room-suite`) |
| `#servicios` | Servicios del hotel; incluye el bloque `#restaurante` |
| `#contact-dialog` | Formulario de consulta (ventana emergente, fuera de `<main>`) |
| `#contacto` | Pie de página con dirección, teléfono, correo e información útil |

### Organización de `styles.css`

Comentarios de bloque separan: variables → base → componentes (cabecera, portada, secciones, tarjetas, fichas, formulario, pie) → `@media`. Puntos de corte *mobile-first*: **640, 768 y 1024 px**, más un ajuste por debajo de 400 px (menú en dos filas).

## 6. Instrucciones para abrir la web

No hace falta instalar nada. Elige una opción:

**Opción A · Abrir el archivo directamente**
Haz doble clic en `index.html`. Se abre en el navegador y funciona todo.

**Opción B · Live Server (recomendada para desarrollar)**
1. Abre la carpeta `hotel-atlantico` en Visual Studio Code.
2. Instala la extensión **Live Server** (de Ritwick Dey) si no la tienes.
3. Clic derecho sobre `index.html` → **Open with Live Server**.
4. Se abre en `http://127.0.0.1:5500` y se recarga sola al guardar.

**Opción C · Servidor de Python**
Desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

Después abre `http://localhost:8000` en el navegador.

**Para comprobar el diseño adaptable:** pulsa F12 → icono de dispositivo (Ctrl + Shift + M) y prueba anchos de 375, 768 y 1440 px. La consola (pestaña *Console*) debe quedar sin errores.

Navegadores recomendados: versiones actuales de Chrome, Edge, Firefox o Safari (necesitan soporte de `<dialog>`).

## 7. Funcionalidades implementadas

**Navegación**
- Menú con anclas a Inicio, Habitaciones, Servicios, Restaurante y Contacto, más un botón «Consultar disponibilidad» en la cabecera.
- Cabecera transparente sobre la portada que pasa a sólida al bajar (`IntersectionObserver`). Sin JavaScript queda sólida.
- Enlace «Saltar al contenido» para teclado y lectores de pantalla.

**Portada**
- Foto de la terraza a pantalla completa con zum lento y fundido (se desactivan si el usuario pide reducir el movimiento).

**Habitaciones**
- 3 tarjetas con foto y precio «desde».
- Cada tarjeta abre una **ficha** en ventana emergente (`<dialog>`) con foto, descripción, características, servicios del hotel, horarios, nota sobre precios y mascotas, y botón para consultar disponibilidad.
- Los servicios y horarios comunes están escritos una sola vez en `<template id="room-extras">` y `script.js` los copia en cada ficha.
- La ficha se cierra con la X, con Esc o con un clic fuera. En escritorio (≥1024 px) va a dos columnas.

**Servicios y restaurante**
- Restaurante de cocina gallega, recepción 24 h, Wi-Fi, parking y terraza.

**Formulario de consulta**
- Lo abren todos los botones con el atributo `data-contact`. Si se abre desde una ficha, selecciona «Solicitud de disponibilidad» y empieza el mensaje con «Me interesa …» (nombre de la habitación).
- Campos: nombre\*, correo\*, teléfono, motivo, mensaje\* y aceptación de la política de privacidad\* (con texto desplegable).
- Validación en `script.js`: campos obligatorios, formato de correo y casilla de privacidad. Cada error aparece debajo de su campo, hay un aviso general, el foco va al primer error y los errores desaparecen al corregirlos.
- Si todo es correcto, muestra una confirmación (ficticia) y el formulario se vacía al cerrar.

**Contacto y pie**
- Teléfono con `tel:`, correo con `mailto:` y dirección con enlace a Google Maps (en pestaña nueva).

**Diseño adaptable y accesibilidad**
- *Mobile-first*, sin desplazamiento horizontal de 320 a 1440 px.
- Contrastes AA, foco visible, textos alternativos en todas las imágenes, `aria-invalid` y mensajes anunciados (`role="alert"` / `role="status"`).

## 8. Limitaciones conocidas

- **Sin reservas, pagos ni envío real:** el formulario no manda datos a ningún servidor; la confirmación es ficticia. Para hacerlo real habría que conectarlo a un servicio o *backend* (y revisar la protección de datos).
- **Sin menú hamburguesa:** en móvil los enlaces del menú se muestran en una fila (dos filas por debajo de 400 px). Está previsto en `styles.css` (comentario «El menú hamburguesa llegará con script.js»).
- **Solo en español:** la información de partida pedía inglés como segundo idioma, pero no hay selector de idioma (solo la mención «English spoken»).
- **Restaurante y contacto no son secciones completas:** el restaurante es un bloque dentro de Servicios y `#contacto` apunta al pie. Faltan horarios y carta del restaurante (no venían en la información de partida).
- **Datos que no venían en la información de partida:** capacidad y m² de las habitaciones, y en qué tarifas entra el desayuno. No se han inventado.
- **Imágenes:** `terraza.jpg` mide unos 1300 px de ancho y se ve algo blanda en pantallas grandes; convendría una versión de unos 2400 px. No hay versiones en WebP ni `srcset`.
- **Navegadores antiguos:** sin soporte de `<dialog>` las fichas no se abren y los botones «Consultar disponibilidad» solo bajan al pie (`#contacto`) en lugar de abrir el formulario.
- **Sin pruebas automáticas:** las comprobaciones se han hecho a mano en el navegador.

## 9. Historial resumido de versiones

| Versión | Commit | Contenido |
|---|---|---|
| 1 · Estructura inicial | `6645704` | Archivos base vacíos (`index.html`, `styles.css`, `script.js`), carpeta `assets/images/` y `.gitignore` |
| 2 · Diseño y página principal | `2b63168` | Variables de la paleta, cabecera, portada, presentación del hotel y pie con contacto |
| 3 · Habitaciones y servicios | `92d95ed` | Tarjetas de habitaciones, servicios, restaurante y sus fotos |
| 4 · JavaScript y formulario | `ac6264d` | `script.js`: cabecera dinámica, fichas en `<dialog>` y formulario con validación y confirmación |
| 5 · Versión final | `b3e4460` | Diseño adaptable (`@media`) y fotos renombradas a `.jpg` sin espacios con rutas actualizadas |

Para ver el detalle:

```bash
git log --stat
```

## 10. Próximos pasos sugeridos

1. Menú hamburguesa para móvil.
2. Versión en inglés.
3. Conectar el formulario a un servicio real de envío.
4. Imágenes optimizadas (WebP, `srcset`) y foto de portada a mayor resolución.
5. Ampliar Restaurante y Contacto a secciones propias cuando el hotel facilite los datos.
