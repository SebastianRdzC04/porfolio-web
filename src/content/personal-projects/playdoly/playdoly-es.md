---
title: PlayDoly (RoMM)
description: Biblioteca de videojuegos autohospedada con RoMM y MariaDB
technologies: [RoMM, Docker, MariaDB, Nextcloud, Linux]
path: playdoly-romm
lang: es
imageUrl: playdoly.webp
---

# PlayDoly - RoMM

PlayDoly es mi biblioteca de videojuegos autohospedada con RoMM.
El objetivo es administrar ROMs, metadatos y recursos visuales en una sola interfaz web.

## Estructura en servidor

Base en la carpeta contenedora `ROMM/`, con separacion para:

- orquestacion Docker
- configuracion persistente
- recursos descargados y assets
- datos de base de datos

La biblioteca de juegos se consume desde la carpeta contenedora de la nube personal (`Cloud/`) mediante montajes.

## Como funciona con Docker

El stack levanta dos servicios principales:

- `romm`: aplicacion web de gestion.
- `romm-db`: base de datos MariaDB.

Tambien usa volumen dedicado para cache interna (`romm_redis_data`) y providers externos de metadata cuando estan configurados.

## Flujo operativo

1. Organizo ROMs en la carpeta compartida de juegos.
2. RoMM indexa el contenido desde `library`.
3. Se enriquecen fichas con metadatos, imagenes y clasificaciones.
4. Todo queda gestionado desde una sola interfaz.

## Integracion en el ecosistema personal

RoMM aprovecha la misma base de almacenamiento compartida con la nube personal.
Esto me da una administracion consistente entre archivos de uso general y biblioteca de juegos, sin duplicar contenido.

## Resultado e impacto personal

PlayDoly me permite centralizar colecciones retro y modernas con estructura ordenada, persistencia en disco y una administracion web clara para escalar la biblioteca sin perder control.
En mi flujo diario me ayuda a mantener todo el catalogo organizado y disponible rapidamente cuando quiero jugar.
