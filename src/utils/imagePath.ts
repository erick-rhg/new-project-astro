/**
 * Normaliza rutas de imágenes para trabajar correctamente con BASE_URL
 * Convierte rutas absolutas (/img/...) a relativas (img/...)
 * y prefija con BASE_URL para resolución correcta en GitHub Pages
 * 
 * @param imagePath - Ruta de imagen a normalizar
 * @param baseUrl - BASE_URL del sitio (por defecto import.meta.env.BASE_URL)
 * @returns Ruta normalizada lista para usar en atributo src
 */
export function normalizeImagePath(
  imagePath: string | undefined,
  baseUrl: string = import.meta.env.BASE_URL || "/"
): string | undefined {
  if (!imagePath || typeof imagePath !== "string" || !imagePath.length) {
    return undefined;
  }

  // Si es URL externa, devolverla sin cambios
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  // Remover slash inicial si existe
  let normalizedPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;

  // Prefixar con BASE_URL
  return `${baseUrl}${normalizedPath}`;
}
