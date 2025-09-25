---
title: DMR - Rifas
description: sistema de administracion para rifas fisicas y digitales
technologies:
  [
    "AdonisJS",
    "Astro",
    "Angular",
    "React",
    "Docker",
    "CronJobs",
    "Node",
    "Postgres",
    "Mongo",
  ]
imgUrl: dmr.jpg
path: dmr-sorteos
---

# Historia del proyecto – Sistema de Rifas

Todo empezó con una idea sencilla: **automatizar y facilitar la forma en la que se administran las rifas**.  
Mi meta era que tanto clientes como administradores tuvieran una experiencia mucho más fluida y moderna.

---

## 👥 Lado del cliente

Desde la página web, los clientes pueden:

- Conocer cada rifa y su premio.
- Comprar boletos o dejar que el sistema les asigne números aleatorios.
- Al momento de comprar, el cliente envía un mensaje a un **bot de WhatsApp automatizado**. Ese bot valida la información, confirma la compra y le envía al cliente los datos para realizar su pago.
- Incluso, si el cliente se equivoca al pagar o sigue mal las instrucciones, el bot detecta esos casos y responde de manera automática.

La idea era que el cliente tuviera todo el proceso claro, sin depender de hablar con una persona en todo momento.

---

## 🛠️ Lado del administrador

El administrador, por su parte, cuenta con un **dashboard completo** que le permite:

- Crear rifas nuevas.
- Ver en tiempo real cómo avanzan las ventas.
- Consultar estadísticas como boletos vendidos y ganancias totales.
- Gestionar transacciones: cancelarlas, marcarlas como pagadas, revisar el estado de los bots, etc.

Básicamente, tiene todo el control de las rifas en un solo lugar.

---

## 💻 Tecnologías utilizadas

- **Cliente web**: Astro
- **Dashboard administrativo**: Angular
- **Backend principal**: AdonisJS
- **Microservicio de ventas físicas**: React
- **Contenedores y despliegue**: Docker en un servidor físico administrado por mí
- **Bases de datos**: PostgreSQL (para la información principal de las rifas) y MongoDB (para los logs y los boletos)

Me gustó mucho la idea de usar dos bases de datos distintas porque, por ejemplo, en una rifa de 10,000 boletos, guardo los datos de la rifa en PostgreSQL pero todos los boletos en MongoDB. Eso hace que sea más escalable y flexible.

---

## 🧾 Ventas físicas y el QR de comprobante

No quise que el sistema se quedara solo en lo digital, así que también diseñé un flujo para **ventas físicas en puntos de venta**.

En este escenario, hay personas que venden boletos directamente al cliente, como si fuera una tienda.  
El vendedor (a través del dashboard administrativo) selecciona la rifa, los boletos y registra la transacción.

Cuando el cliente paga, el sistema genera un **código QR único** que se le entrega como comprobante de su compra. Ese QR es clave:

- El **cliente** es quien lo escanea, no el administrador.
- Al abrirlo, lo lleva a una pequeña página en React que consulta los datos en la base de datos.
- Ahí se muestran todos los detalles de su compra, como un **ticket digital de comprobación**.

Además, ese ticket tiene la opción de enviarse al bot de WhatsApp, lo que refuerza todavía más la validez y autenticidad de la transacción.  
En otras palabras: aunque el cliente haya comprado físicamente, siempre tiene una prueba digital segura y verificable de su boleto.

---

## 🔒 Infraestructura y despliegue

Todo el proyecto está montado en mi **servidor físico personal**.  
Ahí corren los bots, los websockets, el backend, las bases de datos y los microservicios.  
Además, tengo respaldos automáticos diarios de la base de datos para mantener todo seguro.

---

## 🚀 Conclusión

Así nació mi sistema de rifas.  
Al inicio era solo una idea para “automatizar un poco el proceso”, pero terminó siendo un **ecosistema completo** con web, bots, dashboard, ventas físicas y un backend robusto.
