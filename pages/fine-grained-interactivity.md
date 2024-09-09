# Fine grained interactivity

<section class="grid cols-2 auto-cols-fr gap-2 h-full pb-8">
<section class="flex max-h-full overflow-y-auto overflow-x-visible text-xs">
```js {0-100}{lines: true}
const FormInteractivity = () => (
  <form>
    <input
      type="text"
      name="username"
      placeholder="Username"
      hx-get="/validate-username"
      hx-trigger="keyup changed delay:500ms"
      hx-target="#username-error"
    />
    <span id="username-error"></span>
    <input type="text" name="password" placeholder="Password" />
    <button type="submit" class="btn btn-primary">
      Register
    </button>
  </form>
);

new Elysia()
  .get("/validate-username", ({ query: { username } }) => {
    if (username === "admin") {
      return <span class="text-red-500">Username is already taken</span>;
    } else {
      return <span class="text-green-500">Username is available</span>;
    }
  })
  
```
</section>
  <iframe src="http://localhost:3000/register-interactivity" class="relative w-full h-full py-1 rounded-lg"></iframe>
</section>