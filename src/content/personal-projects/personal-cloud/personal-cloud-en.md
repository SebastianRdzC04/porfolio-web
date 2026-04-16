---
title: Personal Cloud (Nextcloud)
description: Self-hosted cloud running on Docker with Nextcloud, PostgreSQL, and Redis
technologies: [Nextcloud, Docker, PostgreSQL, Redis, Linux]
path: personal-cloud-nextcloud
lang: en
imageUrl: nube.webp
---

# Personal Cloud - Nextcloud

This project is my self-hosted personal cloud, deployed with Docker on my physical server.
The main goal is to keep full control over files, permissions, and connected services without relying on external cloud platforms.

## General structure

The whole solution is organized under a parent `Cloud/` container folder on the server.
Inside that container, responsibilities are split into dedicated subfolders for:

- Docker orchestration
- user data
- persistent configuration
- database storage

## Docker setup

The stack follows a three-layer model:

- cloud application
- relational database
- in-memory cache for locking and performance

The cloud app communicates with database and cache over internal Docker networking, while critical data stays on persistent host storage.

## Integration with other projects

This cloud is the shared storage layer for other personal services.
For example, media and gaming projects consume content from it through controlled mounts (read-only when needed).

## Usage flow

1. I upload and organize files in Nextcloud.
2. Data remains separated from application code for easier maintenance and backups.
3. Other server services can consume specific folders from this cloud.

## Outcome and personal impact

This cloud is the storage backbone of my personal ecosystem: it centralizes data, keeps persistence on disk, and connects multiple services to the same source of truth.
In day-to-day use, it gives me better organization, safer backups, and unified access to personal resources.
