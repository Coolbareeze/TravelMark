/**
 * Custom Node.js entry point for Hostinger's "Node.js" hPanel hosting
 * (and any other host that runs apps via Phusion Passenger or a plain
 * `node server.js` process manager instead of `next start`).
 *
 * Hostinger's Node.js app manager expects a single JS file it can start
 * directly — this wraps Next.js's programmatic server API so the whole
 * app (pages, API routes, middleware, image optimisation) runs exactly
 * as it would under `next start`, just from a file Passenger can launch.
 *
 * Not needed on Vercel or other platforms that run `next start` natively.
 */
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOST || "0.0.0.0";
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Travel Mark server ready on http://${hostname}:${port}`);
  });
});
