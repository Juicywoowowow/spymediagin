import express from "express";
import next from "next";

const port = parseInt(process.env.PORT || "4697", 10);
const dev = process.env.NODE_ENV !== "production";

if (!process.env.TURBOPACK) {
  process.env.TURBOPACK = "1";
}

const app = next({ dev, turbo: process.env.TURBOPACK === "1" });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.disable("x-powered-by");

    server.use((req, res) => handle(req, res));

    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(
        `> SPYMEDIA.net ready on http://localhost:${port} (dev=${dev ? "true" : "false"})`
      );
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Error starting server:", err);
    process.exit(1);
  });

