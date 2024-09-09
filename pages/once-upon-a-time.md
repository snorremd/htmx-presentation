# Once upon a time...

<section class="grid cols-2 auto-cols-fr gap-2 h-full pb-8">
<section class="flex max-h-full overflow-y-auto overflow-x-visible text-xs">
```js
const Form = ({ fieldErrors }) => (
  <form action="/login" method="POST">
    <input type="text" name="username" placeholder="Username" />
    <input type="text" name="password" placeholder="Password" />
    {fieldErrors.password && (
      <p>{fieldErrors.password}</p>
    )}
    <button type="submit">Log in</button>
  </form>
);

new Elysia()
  .get("/login", () => (
    <Layout>
      <h1 class="">Hello, HTML server</h1>
      <Form fieldErrors={{}} />
    </Layout>
  ))
  .post("/login", ({ body: {username, password }, set}) => {
    if(username === "admin" && password === "hunter2") {
      set.redirect = "/admin"
      return 
    } else {
      return <Layout>
        <h1 class="">Hello, HTML server</h1>
        <Form fieldErrors={{password: "I'm afraid I can't let you do that Dave"}} />
      </Layout>
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
  <iframe src="http://localhost:3000/login" class="relative w-full h-full py-1 rounded-lg"></iframe>
</section>