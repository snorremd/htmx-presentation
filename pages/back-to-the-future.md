# Back to the Future

<section class="grid cols-2 auto-cols-fr gap-2 h-full pb-8">
<section class="flex max-h-full overflow-y-auto overflow-x-visible text-xs">
```js {2,20-27}{lines: true}
const FormHTMX = ({ fieldErrors }: { fieldErrors: Record<string, string> }) => (
  <form action="/login-htmx" method="POST" hx-boost="true" hx-target="this">
    <input type="text" name="username" placeholder="Username" />
    <input type="text" name="password" placeholder="Password" />
    {fieldErrors.password && (
      <p>{fieldErrors.password}</p>
    )}
    <button type="submit">Log in</button>
  </form>
);

new Elysia()
  .get("/login-htmx", () => (
    <Layout>
      <h1 class="">Hello, HTML server</h1>
      <FormHTMX fieldErrors={{}} />
    </Layout>
  ))
  .post("/login-htmx", ({ body: {username, password }, set}) => {
    if(username === "admin" && password === "hunter2") {
      set.headers['hx-retarget'] = 'body'
      set.headers['hx-swap'] = 'outerHTML'
      return <h1 class="">Welcome, admin</h1>
    } else {
      return <FormHTMX fieldErrors={{password: "I'm afraid I can't let you do that Dave"}} />
    }
  }, {
    body: t.Object({
      username: t.String(),
      password: t.String(),
    }),
  })
  .get("/admin", () => (
    <Layout>
      <h1 class="">Welcome, admin</h1>
    </Layout>
  ))
```
</section>
  <iframe src="http://localhost:3000/login-htmx" class="relative w-full h-full py-1 rounded-lg"></iframe>
</section>