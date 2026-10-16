// api/id.js — 5-day suspension check
const VALID_HASH = "d5a89b7c8deb5413cc7d3abec084b113d0b5f367cf84ca68c3a934754a9483f8";
const SUSPENSION_MS = 5 * 24 * 60 * 60 * 1000; // 5 days

const BANS = {
  "8749607076": "2026-10-15T00:00:00Z",
};

export default function handler(req, res) {
  res.setHeader("content-type", "text/plain");
  res.setHeader("cache-control", "no-store");

  const hash = req.query.unban;
  if (hash !== VALID_HASH) {
    return res.status(403).send("invalid");
  }

  const playerId = req.query.id;
  if (!playerId) {
    return res.status(200).send("OK");
  }

  const banStart = BANS[playerId];
  if (!banStart) {
    return res.status(200).send("OK");
  }

  const endTime = Date.parse(banStart) + SUSPENSION_MS;

  if (Date.now() >= endTime) {
    return res.status(200).send("OK");
  }

  const endDate = new Date(endTime).toISOString();
  return res.status(403).send(`SUSPENDED ${endDate}`);
}
