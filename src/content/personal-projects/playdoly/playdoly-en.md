---
title: PlayDoly (RoMM)
description: Self-hosted game library powered by RoMM and MariaDB
technologies: [RoMM, Docker, MariaDB, Nextcloud, Linux]
path: playdoly-romm
lang: en
imageUrl: playdoly.webp
---

# PlayDoly - RoMM

PlayDoly is my self-hosted game library built with RoMM.
The goal is to manage ROM collections, metadata, and media assets from a single web interface.

## Server structure

It is organized under the `ROMM/` parent folder, with dedicated areas for:

- Docker orchestration
- persistent configuration
- downloaded resources and assets
- database storage

The game library is consumed from the personal cloud parent folder (`Cloud/`) through mounted volumes.

## Docker setup

The stack runs two core services:

- `romm`: web management app.
- `romm-db`: MariaDB database.

It also uses a dedicated cache volume (`romm_redis_data`) and optional external metadata providers.

## Operational flow

1. I organize ROM files in the shared game folder.
2. RoMM indexes content from `library`.
3. Entries are enriched with metadata, artwork, and classifications.
4. Everything is managed from one interface.

## Personal ecosystem integration

RoMM reuses the same shared storage layer as my personal cloud.
That gives me consistent management across general files and game libraries without duplicating data.

## Outcome and personal impact

PlayDoly gives me a centralized, scalable gaming catalog with persistent storage and clear operational control through a self-hosted web platform.
In daily use, it helps me keep my full catalog organized and instantly accessible whenever I want to play.
