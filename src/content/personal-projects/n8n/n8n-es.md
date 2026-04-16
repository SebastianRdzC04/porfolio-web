---
title: Automatizacion n8n
description: Motor de workflows para integraciones y procesos automatizados
technologies: [n8n, Docker, Webhooks, Cloudflare Tunnel, Linux]
path: automatizacion-n8n
lang: es
imageUrl: n8n.webp
---

# Automatizacion con n8n

Este proyecto concentra mis automatizaciones en una instancia dedicada de n8n corriendo en Docker.
La idea es orquestar flujos de trabajo entre servicios del servidor y endpoints externos.

## Estructura en servidor

Base en la carpeta contenedora `Automatizacion/`, separando:

- orquestacion Docker
- datos persistentes de workflows y ejecuciones
- carpeta de intercambio de archivos

## Como funciona con Docker

El servicio usa la imagen oficial `docker.n8n.io/n8nio/n8n` y publica solo en localhost:

- servicio limitado a red local/interna para reducir superficie de exposicion

Esto evita exponer n8n directo a internet y delega exposicion segura a traves de tunel.

## Configuracion clave

- URL publica de webhooks para callbacks externos
- autenticacion activa
- zona horaria unificada para ejecuciones
- permisos reforzados en el archivo de configuracion

## Flujo operativo

1. Creo workflows en n8n.
2. Los triggers se activan por cron, webhooks o eventos.
3. Los flujos consumen APIs, archivos locales y servicios internos.
4. n8n persiste estado y ejecuciones en `n8n_data`.

## Integracion en el ecosistema personal

n8n conecta procesos entre mis otros proyectos personales.
Funciona como capa de orquestacion para automatizar tareas repetitivas, sincronizaciones y flujos operativos entre servicios.

## Resultado e impacto personal

Con esta capa de automatizacion puedo conectar procesos de forma visual, mantener trazabilidad de ejecuciones y reducir tareas manuales en todo mi ecosistema self-hosted.
En el dia a dia me ayuda a enfocarme mas en construir y menos en operar manualmente procesos repetitivos.
