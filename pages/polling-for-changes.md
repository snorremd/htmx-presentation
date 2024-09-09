# Polling for changes

<section class="grid cols-2 auto-cols-fr gap-2 h-full pb-8">
<section class="flex max-h-full overflow-y-auto overflow-x-visible text-xs">
```js
let pollCounter = 0;

new Elysia()
  .get("/poll", () => {
    pollCounter = 0;
    return (
      <Layout>
        <h1 class="">Poll</h1>
        <div hx-get="/poll-result" hx-swap="outerHTML" hx-trigger="every 1s">
          Not ready yet {pollCounter++}
        </div>
      </Layout>
    );
  })
  .get("/poll-result", () => {
    if (pollCounter >= 10) {
      return <div>Ready!</div>;
    } else {
      return (
        <div hx-get="/poll-result" hx-swap="outerHTML" hx-trigger="every 1s">
          Not ready yet {pollCounter++}
        </div>
      );
    }
  })
```
</section>
  <iframe src="http://localhost:3000/poll" class="relative w-full min-h-full py-1 rounded-lg"></iframe>
</section>