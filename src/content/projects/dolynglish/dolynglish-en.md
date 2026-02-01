---
title: Dolynglish
description: Cross-platform mobile app to improve vocabulary and reading comprehension through generated stories
technologies: ["React Native", "AdonisJS", "PostgreSQL", "Docker"]
githubUrl: https://github.com/SebastianRdzC04/dolynglish.git
imageUrl: dolynglish.png
path: dolynglish
lang: en
---

# Dolynglish – Learn English by reading and explaining stories

Dolynglish was born while I was learning English. I realized that completing school requirements helped me understand grammar and structures, but my active vocabulary remained limited and I wasn't practicing real reading comprehension. Dolynglish aims to improve vocabulary and reading comprehension: the app generates stories by category, difficulty and length; users read them, write in their own words what the text was about, and the app evaluates whether that explanation captures the main idea. If the answer is correct, the streak continues, like in Duolingo.

---

## 🎯 Goal

Turn passive reading into active practice: increase vocabulary and reading comprehension through adaptive stories and automatic evaluation, with a streak system that encourages continued practice.

---

## Key Features

- Story generation by category (travel, tech, business, etc.) and difficulty level.
- Adjustable lengths: micro, short, long.
- Mobile-first reading experience.
- Free-text response: users write a short summary or explanation.
- Automatic semantic evaluation to determine whether the explanation matches the core content.
- Streaks and rewards for correct explanations.

---

## User Flow

1. Select category → difficulty → length.
2. Read the generated story in the app.
3. Write a short explanation of what you understood.
4. The backend compares the response with the reference and grades it.
5. Correct answers increase the streak; incorrect answers receive feedback and tips.

---

## Technical Implementation

- Mobile app: React Native (iOS & Android).
- Backend: AdonisJS providing a REST API to manage users, stories and evaluation.
- Database: PostgreSQL for users, progress and content.
- Deployment: Dockerized server and services.
- Evaluation: an NLP module that combines semantic similarity (embeddings) and heuristic rules to decide whether a user's explanation is valid.

If you used a specific model or provider (OpenAI embeddings, sentence-transformers, etc.), tell me and I will update this section with those details.

---

## Status & Deployment

- Status: WIP (change if it's different).
- Deployment: Docker on server; mobile builds handled separately.

---

## Conclusion

Dolynglish converts passive reading into active learning by forcing comprehension and short production, backed by automated evaluation and gamified streaks — a focused way to grow vocabulary and reading confidence in English.
