## 📄 Documentación:

El archivo JSON es el "cerebro" que define el contenido y la estructura de una página (probablemente la página de inicio o una página de servicios) dentro de tu proyecto Astro.

Funciona como un **constructor de páginas** (`PageBuilder`): en lugar de escribir el HTML directamente en un archivo `.astro`, se lee este JSON y se renderizan los componentes dinámicamente.

### 💡 Estructura General

El archivo es una **matriz (array) `[]`** de objetos `{}`.

* Cada **objeto `{}`** dentro de la matriz representa un **bloque de contenido** o una **sección** de la página.
* El componente `PageBuilder` recorre esta matriz y renderiza los bloques en el orden en que aparecen.

Cada bloque de contenido (cada objeto) tiene 3 propiedades principales:

1.  `"component"`: (String) El nombre del componente de Astro que se debe renderizar. En este archivo, **todos los bloques usan el componente `"Section"`**.
2.  `"settings"`: (Object) Opciones de configuración que se aplican al contenedor de la sección. Se usan principalmente para aplicar **clases CSS de layout** (como `"g2-row"`) o atributos de accesibilidad (como `"saltar_contenido"`).
3.  `"props"`: (Object) Los datos (propiedades) que se pasarán al componente `"Section"`. Aquí es donde vive el contenido real.
    * `"card_data"`: Una matriz con los datos para el componente `Cards`.
    * `"image_data"`: Una matriz con los datos para el componente `Images`.

---
### 🏛️ Ejemplo: análisis de los Bloques de la Página `Soluciones y Servicios`

Este JSON define un total de **10 secciones** en la página, todas siguiendo un patrón similar: una tarjeta principal encima y una lista/cuadrícula de imágenes/items debajo.

Todos los bloques usan `"grid_section": "g2-row"`, lo que indica que cada sección se renderiza en un **layout de 2 filas** y principalmente 1 columna para la mayoría de páginas**.

---

#### Bloque 1: Soluciones y servicios

* **Propósito:** Es la sección principal que introduce los servicios.
* **Fila 1 (`card_data`):** Muestra una tarjeta de presentación con el título "Soluciones y servicios", un subtítulo y una descripción general de Keytron.
* **Fila 2 (`image_data`):** Muestra una cuadrícula de 7 imágenes con subtítulos, que actúan como navegación o resumen de las categorías de servicios (Ciberseguridad, Diseño, Logística, etc.).

---

#### Bloque 2: Soluciones (Productos Destacados)

* **Propósito:** Destacar productos o soluciones de software específicas.
* **Settings:** Incluye `"custom_container_img": "soluciones-1col"`, tendrá un estilo personalizado.

* **Fila 1 (`card_data`):** Muestra una tarjeta con el título "Soluciones" y subtítulo "Productos Destacados".
* **Fila 2 (`image_data`):** Muestra una lista de 7 productos (Forcepoint, Stormshield, etc.), cada uno con un subtítulo, una **descripción detallada** y el logo de la marca.

---

#### Bloque 3: Ciberseguridad

* **Propósito:** Detallar los servicios específicos de Ciberseguridad.
* **Fila 1 (`card_data`):** Muestra una tarjeta con el título "Ciberseguridad" y una imagen.
* **Fila 2 (`image_data`):** Lista 9 servicios de ciberseguridad (Soporte, Análisis de Vulnerabilidades, etc.).
* **Nota:** Algunos items tienen `"custom_img": "width-350"`, indicando un tamaño de imagen personalizado para esos elementos.

---

#### Bloque 4: Servicios de ciberseguridad (Continuación)

* **Propósito:** Continuar la lista de servicios de ciberseguridad.
* **Fila 1 (`card_data`):** Es una tarjeta "parcial". Se han puesto a `false` el título, la descripción y la imagen. Solo muestra el **subtítulo** "Servicios de ciberseguridad".
* **Fila 2 (`image_data`):** Lista 10 servicios adicionales (Gestión de Incidentes, Firewall, DDOS, etc.).

---

#### Bloque 5: Soporte inmediato especializado

* **Propósito:** Destacar los servicios de soporte 24/7.
* **Fila 1 (`card_data`):** Otra tarjeta parcial que solo muestra el subtítulo "Soporte inmediato especializado".
* **Fila 2 (`image_data`):** Lista 2 servicios.

---

#### Bloque 6: Diseño

* **Propósito:** Detallar los servicios de Diseño.
* **Fila 1 (`card_data`):** Muestra una tarjeta solo con el título "Diseño" y una imagen.
* **Fila 2 (`image_data`):** Lista 5 servicios de diseño (Arquitecturas, Auditorías, etc.).

---

#### Bloque 7: Logística

* **Propósito:** Detallar los servicios de Logística.
* **Fila 1 (`card_data`):** Muestra una tarjeta solo con el título "Logística" y una imagen.
* **Fila 2 (`image_data`):** Lista 2 servicios de logística.

---

#### Bloque 8: Integración + Instalación / Configuración

* **Propósito:** Detallar los servicios de integración y puesta en marcha.
* **Fila 1 (`card_data`):** Muestra una tarjeta con un título de dos líneas (`\n`) y una imagen.
* **Fila 2 (`image_data`):** Lista 5 servicios relacionados.

---

#### Bloque 9: Mantenimiento

* **Propósito:** Detallar los servicios de Mantenimiento.
* **Fila 1 (`card_data`):** Muestra una tarjeta con el título "Mantenimiento" y una imagen.
* **Fila 2 (`image_data`):** Lista 7 servicios de mantenimiento.

---

#### Bloque 10: Otros servicios

* **Propósito:** Una sección final para servicios misceláneos.
* **Fila 1 (`card_data`):** Muestra una tarjeta con el título "Otros servicios" y una imagen.
* **Fila 2 (`image_data`):** Lista 1 servicio ("Outtasking").