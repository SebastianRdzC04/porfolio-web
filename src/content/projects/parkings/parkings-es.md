---
title: ParKings
description: Sistema de Estacionamiento Inteligente Multiplataforma
technologies:
  [Swift, Storyboard, Angular, AdonisJS, Postgres, Mongo, Python, IOT, Docker]
githubUrl: https://github.com/SebastianRdzC04/ParKings-Integradora.git
imageUrl: parkings.jpg
path: parkings
lang: es
---

# Proyecto Parkings – Estacionamiento Inteligente

Este proyecto nació con la idea de crear un **estacionamiento inteligente, automatizado y multiplataforma**, combinando IoT, aplicaciones móviles y administración en tiempo real.

---

## 📱 Lado del cliente

Los clientes interactúan principalmente a través de una **aplicación móvil nativa** para Android y iOS.  
En la app, los usuarios registrados reciben un **código único**, que les permite:

- Entrar al estacionamiento usando **NFC** o un **código QR** generado en su teléfono, simplemente mostrándolo en un escáner en la pluma de entrada.
- Visualizar un **mapa de lugares disponibles y ocupados**, actualizado en tiempo real gracias a los sensores instalados en cada espacio.
- Acceder a funcionalidades especiales si son **clientes VIP**, como un espacio exclusivo con acceso mediante reconocimiento de placa por cámara, o usando QR/NFC como cualquier cliente normal.

Todo está pensado para que la experiencia del usuario sea rápida, cómoda y confiable, sin depender de personal de seguridad para cada acceso.

---

## 🛠️ Lado del administrador

El **dashboard administrativo** está diseñado para los dueños de los estacionamientos y les permite:

- Ver estadísticas del lugar en tiempo real: entradas, ingresos, ocupación, etc.
- Gestionar clientes VIP y espacios exclusivos.
- Supervisar sensores, cámaras y el estado general del sistema.

El administrador tiene control completo sobre el estacionamiento, desde la operativa diaria hasta el análisis de datos para mejorar la eficiencia.

---

## 🔧 Tecnologías y arquitectura

Este proyecto combina múltiples tecnologías y dispositivos para lograr la automatización completa:

- **Hardware IoT**: Arduino, ESP32 y Raspberry Pi 5.
- **Protocolos de comunicación**: MQTT para la comunicación entre dispositivos, y comunicación serial entre Arduino/ESP y la Raspberry Pi.
- **Backend**: AdonisJS para la API y lógica del sistema.
- **Frontend**: Angular para el dashboard.
- **Bases de datos**: PostgreSQL para datos principales y MongoDB para logs y eventos de sensores.
- **Python**: para programar protocolos de comunicación entre los dispositivos y la Raspberry Pi.
- **Contenedores y despliegue**: Dockerizado, con respaldo automático de bases de datos y servidores MQTT.
- **Tiempo real**: Websockets para actualizar el mapa de lugares y el estado de entradas en tiempo real.

Esta arquitectura permite que todo el sistema sea escalable, confiable y seguro, integrando hardware y software de manera coherente.

---

## 🚀 Conclusión

Parkings es más que un sistema de control de acceso; es un **ecosistema completo de estacionamiento inteligente**.  
Desde el cliente que entra con su QR hasta el administrador que monitorea estadísticas y sensores en tiempo real, todo está automatizado y conectado, creando una experiencia fluida y moderna tanto para usuarios como para operadores.
