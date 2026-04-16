---
title: Nube Personal (Nextcloud)
description: Nube self-hosted en Docker con Nextcloud, PostgreSQL y Redis
technologies: [Nextcloud, Docker, PostgreSQL, Redis, Linux]
path: nube-personal-nextcloud
lang: es
imageUrl: nube.webp
---

# Nube Personal - Nextcloud

Este proyecto es mi nube personal autohospedada, montada en Docker sobre mi servidor fisico.
La idea principal es tener control total de archivos, permisos y servicios conectados sin depender de plataformas externas.

## Estructura general

Toda la solucion vive dentro de la carpeta contenedora `Cloud/` del servidor.
Dentro de esa carpeta separo responsabilidades en subcarpetas para:

- orquestacion Docker
- datos de usuarios
- configuracion persistente
- base de datos

## Como funciona con Docker

El stack sigue un patron de tres capas:

- aplicacion de nube
- base de datos relacional
- cache en memoria para locking y rendimiento

La app de nube se conecta por red interna a la base de datos y al cache, y guarda todo de forma persistente en el disco del host.

## Integracion con otros proyectos

Esta nube funciona como capa de almacenamiento compartido para otros servicios personales.
Por ejemplo, los proyectos de multimedia y biblioteca de juegos consumen contenido desde aqui con montajes controlados (solo lectura cuando aplica).

## Flujo de uso

1. Subo archivos y organizo carpetas desde Nextcloud.
2. Los datos quedan separados de la aplicacion para facilitar mantenimiento y respaldos.
3. Otros servicios del servidor pueden leer carpetas especificas de esa nube.

## Resultado e impacto personal

Esta nube es la base de mi ecosistema personal: centraliza archivos, mantiene persistencia en disco y conecta varios proyectos en una sola fuente de datos.
En mi dia a dia me ayuda a tener respaldos, organizacion y acceso unificado a mis recursos personales.
