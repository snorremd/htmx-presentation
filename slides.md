---
# try also 'default' to start simple
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides, markdown enabled
title: Welcome to Slidev
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# apply any unocss classes to the current slide
class: text-center
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# https://sli.dev/guide/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/guide/syntax#mdc-syntax
mdc: true
---


# HTMX

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
transition: slide-up
class: text-center
layout: center
---

# What is HTMX?

**HTMX** is a library that attempts to extend the capabilities of HTTP and HTML


---
transition: slide-up
class: text-center
layout: center
---

Allow more HTML elements to trigger hypertext requests


---
transition: slide-up
class: text-center
layout: center
---

Ajax, WebSockets, and Server Sent Events in HTML

---
transition: fade-out
class: text-center
layout: center
---

# Demo Time

**Nothing** in the following demo is specific to ElysiaJS and JSX server rendering.

---
src: ./pages/once-upon-a-time.md
hide: false
transition: slide-up
---

---
src: ./pages/adding-htmx-to-your-web-app.md
hide: false
transition: slide-up
---

---
src: ./pages/back-to-the-future.md
hide: false
transition: slide-up
---

---
src: ./pages/fine-grained-interactivity.md
hide: false
transition: fade-out
---

---
transition: slide-up
class: text-center
layout: center
---

# Progressive Enhancement

Design your web app to work without JavaScript, enhance with HTMX

---
src: ./pages/progressive-enhancement.md
hide: false
transition: slide-up
---

---
transition: slide-up
class: text-center
layout: center
---

# Real Time Shenanigans

HTMX supports polling, websockets, and server-sent events for real-time updates

---
src: ./pages/polling-for-changes.md
hide: false
transition: slide-up
---

---
src: ./pages/sse-extension.md
hide: false
transition: slide-up
---

---
src: ./pages/sse-notifications.md
hide: false
transition: slide-up
---

---
transition: slide-up
class: text-center
layout: center
---

# The End

In conclusion, HTMX is a powerful tool for enhancing your web applications
