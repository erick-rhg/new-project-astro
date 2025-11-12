# Documentación: Código fuente (`src/`) y recursos públicos (`public/`)

Este documento explica la estructura de `src/` y `public/` del proyecto Astro. Está enfocado en `src/components/` y `src/data/` para que otros desarrolladores entiendan, extiendan y mantengan el sitio.

---

## Índice

- Visión general
- Diagrama de arquitectura (resumen)
- `src/components` — referencia de componentes (propósito, props, ejemplos)
  - `Header.astro`
  - `Footer.astro`
  - `HeroBanner.astro`
  - `PageBuilder.astro`
  - `Section.astro`
  - `Cards`, `Card`, `Images`, `Image`
  - `Button` / `Buttons`
  - `Formulario` / `Mapa`
- `src/data` — estructura común de los JSON y patrones de uso (esquema detallado)
  - `home-json.json` (ejemplo detallado)
  - otros archivos de datos
- Utilidades
  - `src/utils/imagePath.ts`
- `public/` — recursos estáticos importantes
- Cómo añadir una nueva sección o página
- Buenas prácticas y notas para despliegue (GitHub Pages)

---

## Visión general

El sitio está construido con Astro (SSG). Las páginas usan un layout único `BaseLayout.astro` que incorpora estilos globales y los componentes compartidos `Header`/`Footer`.

El contenido es data-driven: los archivos `src/data/*.json` contienen arrays de "secciones" que `PageBuilder.astro` convierte en componentes (habitualmente `Section.astro`). `Section` delega a componentes más pequeños como `Cards`, `Images`, `Card` e `Image`.

Conceptos clave:

- Renderizado guiado por datos: los JSON describen qué componente y con qué props debe renderizarse cada bloque de página.
- Componentes reutilizables: bloques pequeños y predecibles con props documentadas.
- #### ¡IMPORTANTE! 
    **Gestión de rutas de imágenes** con `BASE_URL`: la utilidad `normalizeImagePath` centraliza el prefijado para que las imágenes funcionen en sub-rutas (p. ej. GitHub Pages).

---

## Diagrama de arquitectura (flujo de renderizado)

  Dentro del contenido de la página:

  Page -> PageBuilder -> Section -> (Cards | Images | otros componentes)

  Ejemplo concreto:

  `index.astro`
    └─ `BaseLayout`
       ├─ `HeroBanner`
       └─ `PageBuilder` (datos: `home-json.json`)
          └─ `Section` (propiedades: `layout_class`, `card_data`, `image_data`)
             ├─ `Cards` -> `Card` (title, subtitle, img, buttons)
             └─ `Images` -> `Image`

---

## `src/components` — referencia detallada

En esta sección explico cada componente importante, sus props, comportamiento y ejemplos de uso con fragmentos de código.

### `Header.astro`

Propósito: navegación principal del sitio (logo, botón hamburger en móvil, submenú "Quiénes somos").

Comportamiento clave:

- Usa `import.meta.env.BASE_URL` (variable `base`) para prefijar rutas de assets (logo, etc.).
- Responsive: menú móvil tipo drawer `.nav-wrapper` que se desliza.
- Accesibilidad: gestiona `aria-expanded`, permite cerrar con Escape, y mueve el foco al primer enlace del menú al abrirlo.
- Submenú: en pantallas pequeñas se despliega con click; en pantallas grandes se abre con hover y focus.

Código relevante (apertura/cierre de menú y manejo de teclado):

```js
const menuToggle = document.querySelector('.menu-toggle');
const navWrapper = document.querySelector('.nav-wrapper');

function openMenu() {
  if (!menuToggle || !navWrapper) return;
  menuToggle.setAttribute('aria-expanded', 'true');
  navWrapper.classList.add('is-active');
  document.body.style.overflow = 'hidden';
  const firstLink = navWrapper.querySelector('a');
  if (firstLink instanceof HTMLElement) firstLink.focus();
}

function closeMenu() {
  if (!menuToggle || !navWrapper) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  navWrapper.classList.remove('is-active');
  document.body.style.overflow = '';
  if (menuToggle instanceof HTMLElement) menuToggle.focus();
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navWrapper.classList.contains('is-active')) {
    closeMenu();
  }
});
```

Notas y recomendaciones:

- Este script se ejecuta en cliente; evita operaciones DOM durante SSR.
- Si agregas submenús nuevos, asegúrate de mantener los atributos ARIA sincronizados (`aria-expanded`).
- Usa `base` cuando añadas rutas a imágenes para que funcionen en deploys con subpath.

### `Footer.astro`

Propósito: pie de página con enlaces legales y redes sociales.

Comportamiento:

- Contiene `<nav aria-label="Pie de página">` con enlaces a `aviso-legal`, `politica-privacidad` y contacto.
- Enlaces sociales con `aria-label` y `title` para accesibilidad.

Fragmento:

```astro
<nav class="nav-container-footer" aria-label="Pie de página">
  <ul class="nav-list-footer">
    <li><a href="aviso-legal">Aviso Legal</a></li>
    <li><a href="politica-privacidad">Política de Privacidad</a></li>
    <li><a href="quienes-somos/certificaciones">Certificaciones</a></li>
    <li><a href="contacto">Contacta con nosotros</a></li>
  </ul>
</nav>

<div class="footer-social">
  <a href="https://linkedin.com" aria-label="Síguenos en LinkedIn" title="LinkedIn">LinkedIn</a>
  <a href="https://twitter.com" aria-label="Síguenos en Twitter" title="Twitter">Twitter</a>
  <a href="https://facebook.com" aria-label="Síguenos en Facebook" title="Facebook">Facebook</a>
</div>
```

### `HeroBanner.astro`

Propósito: sección hero ocupando el viewport, con imagen de fondo y CTA.

Props: `title`, `subtitle`, `button`.

Ejemplo de uso (en `index.astro`):

```astro
<HeroBanner
  button="¡Descubre Keytron!"
  title="Nuestro compromiso, tu éxito"
  subtitle="Conoce cómo podemos ayudarte con nuestras soluciones"
/>
```

Detalles:

- La imagen del hero es un `<img>` con `class="banner-img"` y `position:absolute` para cubrir el fondo.
- El `alt` se genera a partir del `title` o con un texto por defecto.
- El botón enlaza a `#main-content`, que debe existir en la página para que el skip-link funcione correctamente.

### `PageBuilder.astro`

Propósito: renderizador genérico que convierte descriptores en componentes.

Comportamiento:

- Recibe `dataJson`, un array de objetos con la forma `{ component, settings, props }`.
- Busca en un mapa `components` el componente a renderizar y lo instancia con `props`.

Fragmento central:

```astro
{
  dataJson.map((data) => {
    const Component = components[data.component];
    if (!Component) return null;
    return (
      <section id={data.settings?.saltar_contenido} class:list={[data.settings?.layout_class]}>
        <Component {...data.props} settings={data.settings} />
      </section>
    );
  })
}
```

Extender `PageBuilder`:

- Para añadir un nuevo tipo `Gallery`, importa `Gallery.astro` y añádelo al objeto `components`.
- En los JSON, usa `"component": "Gallery"` para que el builder lo invoque.

### `Section.astro`

Propósito: orquestador de un bloque de página. Normalmente contiene `Cards` y/o `Images`.

Props habituales: `card_data` (array), `image_data` (array), `settings`.

Comportamiento:

- Aplica clases de layout según `settings` (p. ej. `grid_section`, `layout_class`).
- Renderiza `Cards` y `Images` si existen en `props`.

Fragmento:

```astro
<div class:list={[
  'inner-content',
  settings?.grid_section,
  settings?.special_class
]}>
  {card_data && <Cards cards={card_data} settings={settings} />}
  {image_data && <Images images={image_data} settings={settings} />}
</div>
```

### `Cards.astro` y `Card.astro`

`Cards` mapea un array de descriptores a componentes `Card`.

Estructura típica de cada `card` (campos usados en el proyecto):

- `title`: string
- `subtitle`: string
- `description`: texto o HTML (se inyecta con `set:html`)
- `img`: ruta relativa (`img/...`) o URL externa
- `buttons`: array de objetos `{ text, url, class_name, arial_label, custom_button }`
