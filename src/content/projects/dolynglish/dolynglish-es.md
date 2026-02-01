---
title: Dolynglish
description: Aplicación móvil multiplataforma para mejorar vocabulario y comprensión lectora mediante historias generadas
technologies: ["React Native", "AdonisJS", "PostgreSQL", "Docker"]
githubUrl: https://github.com/SebastianRdzC04/dolynglish.git
imageUrl: dolynglish.png
path: dolynglish
lang: es
---

# Dolynglish – Aprender inglés leyendo y explicando historias

Este proyecto nació mientras yo aprendía inglés. Noté que cumplir con los requisitos escolares me ayudaba a entender estructuras y gramática, pero mi vocabulario seguía muy limitado y no practicaba comprensión real de textos. Dolynglish nació con la intención de mejorar mi vocabulario y mi comprensión lectora: la aplicación genera historias por categoría, dificultad y longitud; el usuario las lee, escribe en sus propias palabras de qué trataba el texto, y la app evalúa si esa explicación captura la idea central. Si la respuesta es correcta, se mantiene la racha al estilo Duolingo.

---

## 🎯 Objetivo

Convertir la lectura pasiva en práctica activa: aumentar vocabulario y comprensión lectora mediante historias adaptadas y evaluación automática, con un sistema de rachas que motive la práctica continua.

---

## Funcionalidades clave

- Generación de historias por categoría (viajes, tecnología, negocios, etc.) y por nivel de dificultad.
- Longitudes ajustables: micro, corto y largo.
- Interfaz de lectura optimizada para móvil.
- Respuesta libre: el usuario escribe un resumen o explicación breve.
- Evaluación automática semántica que determina si la explicación coincide con la idea principal.
- Sistema de rachas y recompensas por respuestas correctas.

---

## Flujo de usuario

1. El usuario selecciona categoría, dificultad y longitud.
2. Lee la historia generada en la app.
3. Escribe una breve explicación de lo que entendió.
4. El backend compara la respuesta con la referencia y determina correcto/incorrecto.
5. Si es correcto, la racha aumenta; si no, la app ofrece feedback y sugerencias.

---

## Implementación técnica

- App móvil: React Native (iOS y Android) para cubrir ambas plataformas.
- Backend: AdonisJS (API REST) para gestionar usuarios, historias y evaluación.
- Base de datos: PostgreSQL para usuarios, progreso y contenidos.
- Despliegue: Docker para el servidor y servicios relacionados.
- Evaluación: módulo de procesamiento de lenguaje (NLP) que combina similitud semántica (embeddings) y reglas heurísticas para decidir si la explicación es válida.

Si prefieres, puedo detallar la implementación de la evaluación indicando el proveedor o modelo (por ejemplo: OpenAI embeddings, sentence-transformers o un modelo local).

---

## Estado y despliegue

- Estado: WIP (puedes cambiarlo si está en otro estado).
- Despliegue: servidor dockerizado con API REST; las builds móviles se gestionan fuera de este repo.

---

## Conclusión

Dolynglish es una aproximación práctica para mejorar vocabulario y comprensión lectora en inglés, combinando generación adaptativa de contenido con evaluación automática y gamificación por rachas.
