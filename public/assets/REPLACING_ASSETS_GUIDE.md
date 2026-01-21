# Guía para Reemplazar Imágenes de la Web

Para que tu web se vea profesional con tus propias fotos y videos, sigue estos pasos para organizar y actualizar los archivos.

## 1. Dónde guardar tus archivos
He creado una carpeta centralizada para tus imágenes:
`public/assets/images/`

Cualquier archivo que guardes en la carpeta `public/` se puede acceder desde el código usando una ruta simple, por ejemplo: `/assets/images/tu-foto.jpg`.

## 2. Cómo reemplazar una imagen

### Paso A: Preparar el archivo
1.  **Nombre**: Usa nombres simples y descriptivos (ej: `john-mcclain.jpg`, `branding-cover.png`). Evita espacios; usa guiones `-`.
2.  **Formato**: 
    *   Fotos: `.jpg` o `.webp` (mejor rendimiento).
    *   Gráficos con transparencia: `.png`.
3.  **Tamaño**: Intenta que las imágenes no pesen más de 500KB para que la web cargue rápido.

### Paso B: Copiar el archivo
Copia tu imagen a la carpeta:
`c:\Users\jxhnm\Documents\Webs and Apps\Agency\gvlwebreact\public\assets\images\`

### Paso C: Actualizar el código
Busca en los componentes (como `Hero.tsx`) la etiqueta `src`.
Cambia la URL de internet por tu ruta local.

**Ejemplo en Hero.tsx (Tarjeta Quién Soy):**
*Antes:*
```tsx
<img 
  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d..." 
  alt="John Mcclain" 
/>
```

*Después:*
```tsx
<img 
  src="/assets/images/tu-foto.jpg" 
  alt="John Mcclain" 
/>
```

## 3. Lista de Imágenes Actuales (Placeholders)
Actualmente el Hero usa estas imágenes que deberías reemplazar:

1.  **Quién Soy**: (Hero.tsx Line 78 aprox) -> Reemplazar por tu foto de perfil.
2.  **Branding**: (Hero.tsx Line 110 aprox) -> Imagen de un proyecto de branding.
3.  **Producción**: (Hero.tsx Line 129 aprox) -> Imagen de rodaje o video.

---
*Tip: Si necesitas ayuda para cambiar una específica, solo dime "Cambia la imagen de Branding por /assets/images/mi-proyecto.jpg" y yo lo haré por ti.*
