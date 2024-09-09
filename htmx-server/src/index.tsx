import { htmlPlugin } from "./middleware/html/html";
import { Elysia, t } from "elysia";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}
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

const Form = ({ fieldErrors }: { fieldErrors: Record<string, string> }) => (
  <form action="/login" method="POST" class="flex flex-col gap-4">
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

const FormHTMX = ({ fieldErrors }: { fieldErrors: Record<string, string> }) => (
  <form
    action="/login-htmx"
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

const FormProgressive = ({
  fieldErrors,
}: {
  fieldErrors: Record<string, string>;
}) => (
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

const FormInteractivity = () => (
  <form class="flex flex-col gap-4">
    <input
      type="text"
      name="username"
      placeholder="Username"
      hx-get="/validate-username"
      hx-trigger="keyup changed delay:500ms"
      hx-target="#username-error"
      class="p-2"
    />
    <span id="username-error" class="text-red-500 m-0"></span>
    <input type="text" name="password" placeholder="Password" class="p-2" />
    <button type="submit" class="btn btn-primary">
      Register
    </button>
  </form>
);

let pollCounter = 0;

const app = new Elysia()
  .use(htmlPlugin())
  .get("/public/htmx.min.js", () =>
    Bun.file("node_modules/htmx.org/dist/htmx.min.js")
  )
  .get("/public/sse.js", () => Bun.file("node_modules/htmx-ext-sse/sse.js"))
  .get("/public/index.css", () => Bun.file("./public/index.css"))
  .get("/login", () => (
    <Layout>
      <h1 class="">Hello, HTML server</h1>
      <Form fieldErrors={{}} />
    </Layout>
  ))
  .post(
    "/login",
    ({ body: { username, password }, set }) => {
      if (username === "admin" && password === "hunter2") {
        set.redirect = "/admin";
        return;
      } else {
        return (
          <Layout>
            <h1 class="">Hello, HTML server</h1>
            <Form
              fieldErrors={{
                password: "I'm afraid I can't let you do that Dave",
              }}
            />
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
  .get("/login-htmx", () => (
    <Layout>
      <h1 class="">Hello, HTML server</h1>
      <FormHTMX fieldErrors={{}} />
    </Layout>
  ))
  .post(
    "/login-htmx",
    ({ body: { username, password }, set }) => {
      if (username === "admin" && password === "hunter2") {
        set.headers["hx-retarget"] = "body";
        set.headers["hx-swap"] = "outerHTML";
        return <h1 class="">Welcome, admin</h1>;
      } else {
        return (
          <FormHTMX
            fieldErrors={{
              password: "I'm afraid I can't let you do that Dave",
            }}
          />
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
  .get("/register-interactivity", () => (
    <Layout>
      <h1 class="">Hello, HTML server</h1>
      <FormInteractivity />
    </Layout>
  ))
  .get("/validate-username", ({ query: { username } }) => {
    if (username === "admin") {
      return <span class="text-red-500">Username is already taken</span>;
    } else {
      return <span class="text-green-500">Username is available</span>;
    }
  })
  .get("/login-progressive", () => (
    <Layout>
      <h1 class="">Hello, HTML server</h1>
      <FormProgressive fieldErrors={{}} />
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

      if (headers["hx-request"]) {
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
  .get("/admin", () => (
    <Layout>
      <h1 class="">Welcome, admin</h1>
    </Layout>
  ))
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
  .get("/sse-page", () => (
    <Layout>
      <h1 class="">Notifications (SSE)</h1>
      <ul
        hx-ext="sse"
        sse-connect="/sse-notifications"
        sse-swap="message"
        hx-target="this"
        hx-swap="afterbegin"
        class="flex flex-col"
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
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
