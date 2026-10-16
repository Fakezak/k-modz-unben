// api/id.js
const VALID_HASH = "d5a89b7c8deb5413cc7d3abec084b113d0b5f367cf84ca68c3a934754a9483f8";

export default function handler(req, res) {
  res.setHeader("content-type", "text/plain");
  res.setHeader("cache-control", "no-store");

  const hash = req.query.unban;
  if (hash !== VALID_HASH) return res.status(403).send("invalid");

  // Always suspended — no UID needed
  return res.status(403).send("SUSPENDED 2026-10-20T00:00:00.000Z");
}
