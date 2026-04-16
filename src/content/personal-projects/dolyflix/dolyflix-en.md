---
title: DolyFlix (Jellyfin)
description: Personal media server connected to my cloud storage for local streaming
technologies: [Jellyfin, Docker, Nextcloud, Linux]
path: dolyflix-jellyfin
lang: en
imageUrl: dolyflix.webp
---

# DolyFlix - Jellyfin

DolyFlix is my personal streaming layer powered by Jellyfin in Docker.
It is designed to reuse media content already stored in my Nextcloud instance.

## Server structure

It is organized under the `jellyfin/` parent folder, split into:

- persistent configuration
- cache for runtime and metadata

The movie source is mounted from the personal cloud parent folder (`Cloud/`) through internal mounts.

## Docker setup

Jellyfin is defined in the Cloud compose stack with:

- Image: `jellyfin/jellyfin:latest`
- media service exposed on local/private networking
- volumes for configuration and cache
- read-only mount for the movie library

This setup avoids duplicate media files and allows Jellyfin to index the same content managed through the cloud.

## Operational flow

1. I organize movies in Nextcloud.
2. Jellyfin scans the mounted folder.
3. Metadata and library entries are built in Jellyfin.
4. Media is streamed directly from my local server.

## Personal ecosystem integration

Jellyfin reuses the same storage foundation as my personal cloud.
This gives me a single organization point for files, while keeping playback isolated and optimized for media consumption.

## Outcome and personal impact

This architecture gives me a private media platform with centralized storage in Nextcloud and an isolated streaming service for cleaner operations and better scalability.
In day-to-day use, it saves time when browsing and watching content while keeping data ownership fully under my control.
