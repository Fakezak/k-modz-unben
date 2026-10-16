async function onTapToBegin() {
  const btn = document.getElementById("tapToBegin") || document.querySelector(".tap-to-begin");
  if (btn) btn.disabled = true;

  try {
    const playerId = getPlayerId(); // <-- your game's UID getter
    const url = `https://k-modz-unben.vercel.app/id?id=${encodeURIComponent(playerId)}&unban=d5a89b7c8deb5413cc7d3abec084b113d0b5f367cf84ca68c3a934754a9483f8`;

    const res = await fetch(url);
    const text = (await res.text()).trim();

    // ---- OK: load the game ----
    if (text === "OK") {
      loadGame();
      return;
    }

    // ---- SUSPENDED: show the suspension screen ----
    if (text.startsWith("SUSPENDED ")) {
      const until = text.slice(10); // "2026-10-20T00:00:00.000Z"
      const msLeft = Date.parse(until) - Date.now();
      const daysLeft = Math.max(1, Math.ceil(msLeft / 86400000));
      showSuspension(daysLeft, until);
      return;
    }

    // ---- invalid hash ----
    if (text === "invalid") {
      showError("Config invalid — contact admin");
      return;
    }

    // ---- anything else ----
    showError("Unexpected response: " + text);

  } catch (err) {
    showError("Connection failed: " + err.message);
  }
}

function showSuspension(daysLeft, untilISO) {
  const screen = document.getElementById("tapScreen") || document.body;
  screen.innerHTML = `
    <div style="color:red;font-size:22px;text-align:center;font-family:sans-serif;padding:40px">
      <div style="font-size:28px;margin-bottom:16px">🚫 SUSPENDED</div>
      <div>${daysLeft} day(s) remaining</div>
      <div style="opacity:.7;font-size:16px;margin-top:8px">Until: ${untilISO.slice(0, 10)}</div>
    </div>
  `;
}

function showError(msg) {
  const screen = document.getElementById("tapScreen") || document.body;
  screen.innerHTML = `
    <div style="color:orange;font-size:18px;text-align:center;font-family:sans-serif;padding:40px">
      ${msg}
    </div>
  `;
}

function loadGame() {
  const screen = document.getElementById("tapScreen");
  if (screen) screen.remove();
  // startGame();   ← your existing load call
}
