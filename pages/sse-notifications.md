# Subscribing to Server-Sent Events (SSE)

<section class="grid cols-2 auto-cols-fr gap-2 h-full pb-8">
<section class="flex max-h-full overflow-y-auto overflow-x-visible text-xs">
```js
let pollCounter = 0;

new Elysia()
.get("/sse-page", () => (
    <Layout>
      <h1 class="">Notifications (SSE)</h1>
      <ul
        hx-ext="sse"
        sse-connect="/sse-notifications"
        sse-swap="message"
        hx-target="this"
        hx-swap="afterbegin"
      ></ul>
    </Layout>
  ))
  .get("/sse-notifications", ({ request, set }) => {
    const notifications = [
      "Hello",
      "How are you?",
      "Goodbye",
      "See, you later",
    ];

    const signal = request.signal;
    set.headers["Content-Type"] = "text/event-stream";
    set.headers["Cache-Control"] = "no-cache";
    set.headers["Connection"] = "keep-alive";
    set.headers["Transfer-Encoding"] = "chunked";
    return new Response(
      new ReadableStream({
        start(controller) {
          const interval = setInterval(() => {
            if (notifications.length > 0) {
              controller.enqueue(
                new TextEncoder().encode(
                  `data: <li>${notifications.shift()}</li>\n\n`
                )
              );
            }
          }, 5000);

          signal.onabort = () => {
            clearInterval(interval);
            controller.close();
          };
        },
      })
    );
  })
```
</section>
  <iframe src="http://localhost:3000/sse-page" class="relative w-full min-h-full py-1 rounded-lg"></iframe>
</section>