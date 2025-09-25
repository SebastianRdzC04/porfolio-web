---
title: Cathub
description: Ecosistema para Gatitos (Limpieza y Almentacion)
technologies:
  ["Python", "AdonisJS", "Angular", "Docker", "Mongo", "Postgres", "IOT"]
imageUrl: cathub.png
path: cat-hub
---

# CatHub – Sistema IoT de Arenero, Comedero y Bebedero Inteligentes

CatHub nació con la idea de crear un **ecosistema inteligente para el cuidado de gatos**, combinando IoT, aplicaciones móviles y un dashboard web completo.  
El objetivo era automatizar tareas diarias, dar visibilidad al dueño y mejorar la experiencia tanto para los gatos como para los usuarios.

---

## 🐾 Componentes inteligentes

### Arenero

El arenero está diseñado para **autolimpiarse**:

- Detecta cuándo está demasiado sucio y se activa automáticamente para limpiarse.
- También se puede limpiar manualmente desde la **app móvil**, dando al usuario control total.

### Comedero

El comedero tiene sensores que permiten:

- Monitorear la cantidad de comida disponible en el plato y en el almacén.
- Reabastecer automáticamente cuando se está acabando, asegurando que nunca falte comida.

### Bebedero

El bebedero también está automatizado:

- Mide el nivel de agua y la calidad del líquido.
- Se rellena automáticamente cuando detecta que está bajo el nivel óptimo.

Todo esto permite que los gatos tengan alimento y agua disponibles de manera constante, sin intervención manual diaria.

---

## 📱 Aplicación móvil

La app móvil permite a los usuarios:

- Revisar el estado de cada dispositivo en tiempo real.
- Activar limpiezas o ajustes manuales si es necesario.
- Ver historial de actividad, niveles de comida y agua, y alertas importantes.

---

## 🖥️ Dashboard web

El **dashboard web** funciona como la versión extendida de la app:

- Ofrece la misma información que la app móvil, pero con **más detalles y estadísticas**.
- Permite supervisar todos los dispositivos de manera centralizada.
- Ideal para usuarios que quieren un control completo desde su computadora.

---

## 🔧 Tecnologías y arquitectura

CatHub reutiliza muchas de las tecnologías del proyecto anterior (Parkings), adaptadas a un entorno IoT doméstico:

- **Hardware IoT**: Arduino, ESP32 y Raspberry Pi 5.
- **Protocolos de comunicación**: MQTT y comunicación serial entre los dispositivos y la Raspberry Pi.
- **Backend**: AdonisJS para la API y lógica del sistema.
- **Frontend**: Angular para el dashboard y React/Flutter para la app móvil.
- **Bases de datos**: PostgreSQL y MongoDB para logs, historial y datos de sensores.
- **Python**: para programar protocolos de comunicación y automatización de dispositivos.
- **Contenedores y despliegue**: Dockerizado, con servidores MQTT, websockets y respaldos automáticos.

Esta arquitectura permite que todo el sistema sea escalable, confiable y seguro, integrando hardware y software de manera coherente.

---

## 🚀 Conclusión

CatHub es un **ecosistema inteligente para el cuidado de gatos**, donde cada dispositivo funciona de manera autónoma y coordinada.  
Desde el arenero que se limpia solo hasta el comedero y bebedero que se reabastecen automáticamente, el sistema asegura que los gatos estén bien atendidos mientras los dueños tienen **control y visibilidad completa** a través de la app y el dashboard web.
