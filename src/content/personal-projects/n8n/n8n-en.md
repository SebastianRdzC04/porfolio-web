---
title: n8n Automation
description: Workflow engine for integrations and automated processes
technologies: [n8n, Docker, Webhooks, Cloudflare Tunnel, Linux]
path: n8n-automation
lang: en
imageUrl: n8n.webp
---

# Automation with n8n

This project centralizes my automations in a dedicated n8n instance running in Docker.
The goal is to orchestrate workflows across internal server services and external endpoints.

## Server structure

It is organized under the `Automatizacion/` parent folder, split into:

- Docker orchestration
- persistent workflow and execution data
- file exchange workspace

## Docker setup

The service uses the official `docker.n8n.io/n8nio/n8n` image and is bound to localhost only:

- service restricted to local/internal networking to reduce exposure surface

This prevents direct internet exposure and keeps public access behind a tunnel layer.

## Key configuration

- public webhook base URL for external callbacks
- authentication enabled
- unified timezone for consistent scheduling
- enforced settings file permissions

## Operational flow

1. I build workflows in n8n.
2. Triggers run on cron, webhooks, or events.
3. Flows connect APIs, local files, and internal services.
4. n8n stores executions and state in `n8n_data`.

## Personal ecosystem integration

n8n links processes across my personal projects.
It acts as the orchestration layer for repetitive tasks, sync operations, and service-to-service workflows.

## Outcome and personal impact

This automation layer gives me visual process orchestration, execution traceability, and less manual operational work across my self-hosted stack.
In daily use, it lets me focus more on building new features and less on manually running routine operations.
