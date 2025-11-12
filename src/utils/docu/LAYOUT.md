## 📄 Documentación del Layout: `.grid-layout`

Su objetivo principal es crear una **columna de contenido centrada** con un ancho máximo, al mismo tiempo que permite que ciertos elementos "escapen" de esa columna y ocupen el **ancho completo** de la pantalla (un efecto conocido como "full bleed").

### 🏛️ `.grid-layout` (El Contenedor Principal)

Define el contenedor grid que gestionará la maquetación principal de la página.

```css
.grid-layout {
  display: grid;
  grid-template-columns: 
    [full-start] minmax(var(--page-gutter-min), 1fr) 
    [content-start] minmax(0, var(--content-max-width)) [content-end] 
    minmax(var(--page-gutter-min), 1fr) [full-end];
    
    row-gap:var(--space-section);
}
```

  * `display: grid;`: Activa el contexto de CSS Grid.
  * `grid-template-columns`: Define tres columnas:
    1.  `minmax(var(--page-gutter-min), 1fr)`: La **columna de la izquierda (gutter)**. Tendrá un tamaño mínimo (`--page-gutter-min`) pero crecerá (`1fr`) para ocupar el espacio sobrante.
    2.  `minmax(0, var(--content-max-width))`: La **columna de contenido central**. Su ancho máximo está limitado por la variable `--content-max-width`, pero puede encogerse hasta `0` si es necesario.
    3.  `minmax(var(--page-gutter-min), 1fr)`: La **columna de la derecha (gutter)**, idéntica a la izquierda.
  * **Líneas de Grid con Nombre**:
      * `[full-start]` y `[full-end]`: Marcan el inicio y el final de la rejilla completa (las 3 columnas).
      * `[content-start]` y `[content-end]`: Marcan el inicio y el final de la columna de contenido central.
  * `row-gap: var(--space-section);`: Añade un espacio vertical (definido por `--space-section`) entre los elementos hijos directos del grid.

-----

### 📦 `.grid-layout > *` (Comportamiento por Defecto)

Este selector (`> *`) se aplica a **todos los hijos directos** de `.grid-layout`.

```css
.grid-layout > * {
  grid-column: content;
}
```

  * `grid-column: content;`: Es equivalente a `grid-column: content-start / content-end;`.
  * **Efecto**: Por defecto, cualquier elemento que sea hijo directo de `.grid-layout` se colocará **automáticamente dentro de la columna de contenido central**
-----

### ↔️ `.grid-layout > .full-bleed` (La Excepción "Full Bleed")

Este selector se aplica solo a los hijos directos que tengan la clase `.full-bleed`.

```css
.grid-layout > .full-bleed {
  grid-column: full;
}
```

  * `grid-column: full;`: Sobrescribe la regla anterior. `full` es una abreviatura para `grid-column: full-start / full-end;`.
  * **Efecto**: Los elementos con la clase `.full-bleed` ignoran el contenedor central y **se expanden para ocupar todo el ancho disponible**, desde `full-start` hasta `full-end` (las 3 columnas), como el hero-banner de la página

-----

### 📐 `.full-bleed .inner-content` (Contenido dentro de un "Full Bleed")

Este selector se aplica a un elemento (con clase `.inner-content`) que esté *dentro* de un elemento `.full-bleed`.

```css
.full-bleed .inner-content {
  max-width: var(--content-max-width);
  margin-inline: auto;
  padding-inline: var(--page-gutter-min);
}
```

  * **Propósito**: A menudo, un elemento `.full-bleed` (como una sección con un color de fondo) necesita ocupar todo el ancho, pero el *texto* u otro contenido *dentro* de él debe **volver a alinearse con la columna de contenido principal**.
  * `max-width: var(--content-max-width);`: Limita el ancho de este contenido interno, usando la misma variable que la columna central.
  * `margin-inline: auto;`: Centra horizontalmente el `.inner-content` dentro de su padre `.full-bleed`.
  * `padding-inline: var(--page-gutter-min);`: Añade un espaciado lateral (padding) para asegurar que el contenido no toque los bordes en pantallas más pequeñas, usando la variable del "gutter".