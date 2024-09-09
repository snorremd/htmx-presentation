# Server Sent Events (SSE) via Extension

```js {7,20}{lines: true}
const Layout = ({ children }: LayoutProps) => (
  <html>
    <head>
      <title>htmx-server</title>
      <link rel="stylesheet" href="/public/index.css" />
      <script src="/public/htmx.min.js"></script>
      <script src="/public/sse.js"></script>
    </head>
    <body class="bg-base-100 min-h-screen p-4 prose flex flex-col">
      {children}
    </body>
  </html>
);

const app = new Elysia()
  .use(html())
  .get("/public/htmx.min.js", () =>
    Bun.file("node_modules/htmx.org/dist/htmx.min.js")
  )
  .get("/public/sse.js", () => Bun.file("node_modules/htmx-ext-sse/sse.js"))

app.listen(3000)
```
