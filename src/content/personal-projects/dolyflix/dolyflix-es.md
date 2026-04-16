---
title: DolyFlix (Jellyfin)
description: Servidor multimedia personal conectado a mi nube para streaming local
technologies: [Jellyfin, Docker, Nextcloud, Linux]
path: dolyflix-jellyfin
lang: es
imageUrl: dolyflix.webp
---

# DolyFlix - Jellyfin

DolyFlix es mi capa de streaming personal usando Jellyfin sobre Docker.
La integracion esta hecha para reutilizar contenido multimedia almacenado en mi Nextcloud.

## Estructura en servidor

Base en la carpeta contenedora `jellyfin/`, separando:

- configuracion persistente
- cache de operacion y metadatos

La fuente de peliculas llega desde la carpeta contenedora de la nube personal (`Cloud/`) mediante montajes internos.

## Como funciona con Docker

El servicio Jellyfin esta definido dentro del compose de Cloud y usa:

- Imagen: `jellyfin/jellyfin:latest`
- publicacion del servicio multimedia en red local/privada
- volumenes para configuracion y cache
- montaje en solo lectura de la biblioteca de peliculas

Este diseno evita duplicar archivos de video y permite que el catalogo de Jellyfin tome directamente los datos de la nube.

## Flujo operativo

1. Organizo peliculas en Nextcloud.
2. Jellyfin escanea esa carpeta montada.
3. Se generan metadatos y biblioteca en la interfaz multimedia.
4. El consumo se hace por streaming desde el servidor local.

## Integracion en el ecosistema personal

Jellyfin aprovecha la misma base de almacenamiento de la nube personal.
Eso me permite mantener un unico punto de organizacion para archivos y, al mismo tiempo, una experiencia de consumo separada y optimizada para multimedia.

## Resultado e impacto personal

Con esta arquitectura tengo una plataforma multimedia privada, con almacenamiento centralizado en Nextcloud y servicio de reproduccion separado para mantener orden y escalabilidad.
En la practica me ahorra tiempo para encontrar y reproducir contenido, sin depender de servicios externos ni duplicar datos.
