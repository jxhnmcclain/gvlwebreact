# Blog Posts Guide

This document provides instructions for LLMs and developers on how to create new blog posts for Growth Video Lab.

## File Location

All blog posts are stored in:
```
content/blog/
```

## Naming Convention

Use this format for file names:
```
YYYY-MM-DD-slug-with-dashes.md
```

**Example:** `2026-02-15-video-marketing-strategy.md`

## Frontmatter Template

Every blog post MUST start with this YAML frontmatter:

```yaml
---
title: "Your Post Title Here (50-60 characters ideal)"
date: "YYYY-MM-DD"
author: "Growth Video Lab"
description: "Meta description for SEO (150-160 characters). Should be compelling and include target keyword."
excerpt: "Short excerpt that appears on blog cards (1-2 sentences)."
category: "Category Name"
tags: ["tag1", "tag2", "tag3"]
image: "/blog/your-image.jpg"
readTime: 8
---
```

## Available Categories

- Video Marketing
- Branding
- Social Media
- Websites
- Estrategia Digital
- IA y Automatización

## Content Guidelines

### Structure
1. **H1 Title** - Same as frontmatter title (only one H1)
2. **Introduction** - Hook the reader, state the problem
3. **Table of Contents** - For posts longer than 5 sections
4. **H2 Sections** - Main content sections
5. **H3 Subsections** - Supporting points
6. **Conclusion** - Summary and CTA
7. **Author Bio** - Standard footer

### SEO Best Practices
- Include target keyword in title, first paragraph, and H2s
- Add internal links to service pages: `/servicios`, `/contacto`, `/asesoria`
- Add external links to authoritative sources
- Use descriptive alt text for images
- Keep paragraphs short (3-4 sentences max)

### Markdown Features Supported
- **Bold** and *italic* text
- [Links](url) - internal and external
- `inline code` and code blocks
- Blockquotes with `>`
- Ordered and unordered lists
- Images: `![alt text](/blog/image.jpg)`

## Image Guidelines

1. Store images in: `public/blog/`
2. Use descriptive file names: `video-marketing-chart.jpg`
3. Optimize images before uploading (WebP preferred)
4. Reference as: `/blog/image-name.jpg`

## Example Post Structure

```markdown
---
title: "Título del Post"
date: "2026-02-15"
author: "Growth Video Lab"
description: "Descripción SEO del post."
excerpt: "Extracto corto."
category: "Video Marketing"
tags: ["video", "marketing", "estrategia"]
image: "/blog/featured-image.jpg"
readTime: 7
---

# Título del Post

Introducción que engancha al lector.

## Tabla de Contenidos
1. [Sección 1](#sección-1)
2. [Sección 2](#sección-2)

## Sección 1

Contenido con [enlaces internos](/servicios) y datos relevantes.

## Sección 2

Más contenido con [fuentes externas](https://ejemplo.com).

## Conclusión

Resumen y llamado a la acción. [Contáctanos](/contacto).

---

**Sobre el autor:** Growth Video Lab es una agencia especializada en...
```

## After Creating a Post

1. Save the file in `content/blog/`
2. The post will automatically appear on the blog index
3. Verify at `http://localhost:5173/blog`
