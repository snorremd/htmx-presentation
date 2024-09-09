# HTMX Presentation

This is an interactive HTMX presentation that demonstrated some fundamental concepts of HTMX.
It is intended to be used as an inspirational tool for developers to learn about HTMX.
A server is run along side the presentation to demonstrate the concepts in real time.

## Getting Started

For simplicity I've kept the server and the presentation in the same repository, but as separate projects.
You want two terminals to run the setup:

Presentation:
```bash
bun install
bun run production
```

Server:
```bash
cd htmx-server
bun install
bun run dev
```

Presentation is now available at [http://localhost:3030](http://localhost:3030) and the server is available at [http://localhost:3000](http://localhost:3000).
The presentation displays the web app inside an iframe, so you only need to open the presentation.

## Making changes

Edit the [slides.md](./slides.md).
Learn more about Slidev on [documentations](https://sli.dev/).

## License

Code and slides are copyright Snorre Magnus Davøen.
If you want to use the code or the slides, please reach out at contact at snorre dot io.
