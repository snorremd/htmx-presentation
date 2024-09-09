# Adding HTMX to your web app

Simple setup, 48kB of minified JavaScript, no external dependencies

First add the HTMX script to your server

```js {2-4}
new Elysia()
  .get("/public/htmx.min.js", () =>
		Bun.file("node_modules/htmx.org/dist/htmx.min.js"),
	)
  // Rest of handlers here
```

Then add the script to your head element

```js {6,6}
const Layout = ({children}: LayoutProps) => (
  <html>
    <head>
      <title>htmx-server</title>
      <link rel="stylesheet" href="/public/index.css" />
      <script src="/public/htmx.min.js"></script>
    </head>
    <body class="bg-base-100 min-h-screen p-4 prose flex flex-col">{children}</body>
  </html>
);
```