# Eshiet Ekemini — Community Manager Portfolio

A personal portfolio website for **Eshiet Ekemini**, Senior Community Manager & Strategist. It's a fast, dependency-free static site built with plain HTML, CSS, and JavaScript, deployed on Vercel.

🔗 **Live site:** https://moderator-website.vercel.app

## Table of Contents

- [Features](#features)
- [Sections](#sections)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Accessibility & Performance](#accessibility--performance)
- [Contact](#contact)

## Features

- **Animated hero** with a typewriter effect on the headline and scroll-triggered count-up metrics.
- **Portfolio galleries** for LAOS Designs, LAOS Memes, and other project designs, each with a "view all" modal and a full **lightbox** (keyboard navigation: `←` / `→` / `Esc`).
- **Skills marquee**, services grid, work timeline, content showcase, stats, tools, and client testimonials.
- **Custom cursor**, smooth scroll navigation, scroll-spy active-link highlighting, and staggered scroll-reveal animations.
- **Animated tab title** (subtle marquee) and a "come back" nudge when the tab loses focus.
- **Download CV** button that opens the PDF version of the résumé.
- **Responsive** layout that adapts from desktop to mobile.

## Sections

| Section | Description |
| --- | --- |
| Hero | Headline, intro, CTAs (See My Work, Get in Touch, Download CV), key metrics |
| About | Background and approach |
| Services | Community management services offered |
| Work | Communities grown, presented as project cards |
| Content | Design and content portfolio with galleries |
| Numbers | Animated statistics behind the results |
| Tools | Platforms & tools used |
| Testimonials | What clients say |
| Contact | Direct contact channels (Email, LinkedIn, X/Twitter, Discord, WhatsApp) |

## Tech Stack

- **HTML5**, **CSS3**, **vanilla JavaScript** — no framework, no build step.
- **Font Awesome 6** for icons (via CDN).
- **Roboto** typeface via Google Fonts.
- **Vercel** for hosting (see [`vercel.json`](./vercel.json), which enables `cleanUrls`).

## Project Structure

```
.
├── index.html                     # Main single-page site
├── styles.css                     # All styling and animations
├── script.js                      # Interactivity (cursor, reveal, lightbox, galleries, typewriter, counters)
├── vercel.json                    # Vercel config (cleanUrls)
├── My CV Community Manager.pdf    # Downloadable CV
├── profile-photo.jpg              # Hero profile image
├── LAOS Designs/                  # Design assets for the LAOS gallery
├── LAOS Memes/                    # Meme assets for the memes gallery
└── Other Designs/                 # Other project design assets
```

## Getting Started

This is a static site with no dependencies to install. Just serve the folder with any static file server.

**Option 1 — VS Code:** install the *Live Server* extension and use "Open with Live Server".

**Option 2 — Node:**

```bash
npx http-server . -p 8080 -c-1
```

**Option 3 — Python (if available):**

```bash
python -m http.server 8080
```

Then open http://localhost:8080 in your browser.

## Deployment

The site deploys to [Vercel](https://vercel.com). Because it's a plain static site, Vercel auto-detects the framework as "Other" and serves the files directly. Pushing to the linked Git repository triggers a redeploy.

> **Note:** After adding or updating assets (e.g. the CV PDF), redeploy so the live site serves the latest files.

## Accessibility & Performance

- Animations respect the `prefers-reduced-motion` setting (typewriter and count-up are disabled when reduced motion is requested).
- Semantic landmarks (`<header>`, `<main>`, `<section>`, `<footer>`) and ARIA labels on interactive controls (lightbox, modals, buttons).
- Images use lazy loading (the hero image is prioritized) and descriptive `alt` text.

## Contact

- **Email:** ekemini456@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/ekemini-eshiet-864910336
- **X / Twitter:** https://x.com/ekemini58110
