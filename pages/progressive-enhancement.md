# Progressive Enhancement in practice

<section class="grid cols-2 auto-cols-fr gap-2 h-full pb-8">
<section class="flex max-h-full overflow-y-auto overflow-x-visible text-xs">
```js {3,27-57}{lines: true}
const FormProgressive = ({ fieldErrors }: { fieldErrors: Record<string, string> }) => (
  <form
    action="/login-progressive"
    method="POST"
    hx-boost="true"
    hx-target="this"
    class="flex flex-col gap-4"
  >
    <input type="text" name="username" placeholder="Username" class="p-2" />
    <input type="text" name="password" placeholder="Password" class="p-2" />
    {fieldErrors.password && (
      <p class="text-red-500 m-0">{fieldErrors.password}</p>
    )}
    <button type="submit" class="btn btn-primary">
      Log in
    </button>
  </form>
);

new Elysia()
  .get("/login-progressive", () => (
    <Layout>
      <h1 class="">Hello, HTML server</h1>
      <FormHTMX fieldErrors={{}} />
    </Layout>
  ))
  .post(
    "/login-progressive",
    ({ body: { username, password }, headers, set }) => {
      if (username === "admin" && password === "hunter2") {
        if (headers["hx-request"]) {
          return <h1 class="">Welcome, admin</h1>;
        } else {
          set.redirect = "/admin";
          return;
        }
      }

      const formWithError = (
        <FormProgressive
          fieldErrors={{
            password: "I'm afraid I can't let you do that Dave",
          }}
        />
      );

      if (headers["HX-Request"]) {
        return formWithError;
      } else {
        return (
          <Layout>
            <h1 class="">Hello, HTML server</h1>
            {formWithError}
          </Layout>
        );
      }
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    }
  )

```
</section>
  <iframe src="http://localhost:3000/login-progressive" class="relative w-full h-full py-1 rounded-lg"></iframe>
</section>