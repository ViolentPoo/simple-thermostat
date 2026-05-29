import {
  mdiAirConditioner,
  mdiBed,
  mdiFan,
  mdiFanSpeed1,
  mdiFanSpeed2,
  mdiFanSpeed3,
  mdiFire,
  mdiHome,
  mdiHomeExportOutline,
  mdiLeaf,
  mdiMinus,
  mdiPercent,
  mdiPlus,
  mdiPower,
  mdiRadiator,
  mdiSnowflake,
  mdiSofa,
  mdiTemperatureCelsius,
  mdiThermometer,
  mdiWaterPercent,
  mdiWeatherWindy,
  mdiWhiteBalanceSunny,
} from "@mdi/js";
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const icon = (path, className = "") => `
  <svg class="icon ${className}" viewBox="0 0 24 24" aria-hidden="true">
    <path d="${path}"></path>
  </svg>
`;

const modeButton = ({ label, path, active = false, heat = false, compact = false }) => `
  <div class="mode ${active ? "active" : ""} ${heat ? "heat" : ""} ${compact ? "compact" : ""}">
    ${icon(path)}
    <span>${label}</span>
  </div>
`;

const entity = ({ path, value }) => `
  <div class="entity">
    ${icon(path)}
    <span>${value}</span>
  </div>
`;

const toggle = ({ label, on = false }) => `
  <div class="toggle-row">
    <span>${label}</span>
    <div class="toggle ${on ? "on" : ""}"><i></i></div>
  </div>
`;

const setpoint = (value) => `
  <div class="setpoint">
    ${icon(mdiMinus, "step")}
    <strong>${value}</strong>
    ${icon(mdiPlus, "step")}
  </div>
`;

const header = ({ title, path, off = false, toggleLabel, toggleOn = false }) => `
  <header>
    <div class="title">
      <span class="header-icon ${off ? "off" : ""}">${icon(path)}</span>
      <h2>${title}</h2>
    </div>
    ${toggleLabel ? toggle({ label: toggleLabel, on: toggleOn }) : ""}
  </header>
`;

const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    :root {
      color-scheme: dark;
      --bg: #090d11;
      --card: #181b1d;
      --card-2: #222426;
      --line: #3f4245;
      --text: #eeeeee;
      --muted: #b8b8b8;
      --blue: #4a85bc;
      --cyan: #0aa6cc;
      --orange: #ff8000;
    }

    * { box-sizing: border-box; }

    body {
      width: 1203px;
      height: 1307px;
      margin: 0;
      overflow: hidden;
      background:
        radial-gradient(circle at 15% 12%, rgba(74, 133, 188, 0.18), transparent 23%),
        radial-gradient(circle at 88% 6%, rgba(255, 128, 0, 0.09), transparent 20%),
        var(--bg);
      color: var(--text);
      font-family: "Segoe UI", Roboto, Arial, sans-serif;
      padding: 34px;
    }

    .mast {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 28px;
      margin: 0 0 24px;
    }

    .mast h1 {
      margin: 0;
      font-size: 48px;
      line-height: 1;
      font-weight: 700;
      letter-spacing: 0;
    }

    .mast p {
      margin: 10px 0 0;
      color: #aab5bf;
      font-size: 24px;
    }

    .pill {
      color: #c8d6e2;
      border: 1px solid rgba(255,255,255,.16);
      background: rgba(255,255,255,.045);
      border-radius: 999px;
      padding: 10px 16px;
      font-size: 20px;
      white-space: nowrap;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .card {
      position: relative;
      background: linear-gradient(180deg, rgba(255,255,255,.018), rgba(255,255,255,0)), var(--card);
      border: 2px solid var(--line);
      border-radius: 28px;
      padding: 34px 36px 28px;
      min-height: 300px;
      overflow: hidden;
    }

    .wide { grid-column: 1 / -1; }
    .hero { grid-column: 1 / -1; min-height: 420px; }
    .medium { min-height: 350px; }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      margin-bottom: 36px;
    }

    .title {
      display: flex;
      align-items: center;
      min-width: 0;
      gap: 24px;
    }

    h2 {
      margin: 0;
      font-size: 58px;
      line-height: 1;
      font-weight: 400;
      letter-spacing: 0;
      white-space: nowrap;
    }

    .icon {
      width: 1em;
      height: 1em;
      display: block;
      fill: currentColor;
      flex: none;
    }

    .header-icon {
      position: relative;
      color: var(--blue);
      font-size: 66px;
      filter: drop-shadow(0 0 16px rgba(74, 133, 188, .18));
      flex: none;
    }

    .header-icon.off::before {
      content: "";
      position: absolute;
      left: 18%;
      top: 8%;
      width: 78%;
      height: 11%;
      border-radius: 999px;
      background: #11171d;
      transform: rotate(45deg);
      transform-origin: left center;
      box-shadow: 0 -3px 0 var(--blue);
      z-index: 2;
    }

    .toggle-row {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 30px;
      color: var(--text);
      white-space: nowrap;
    }

    .toggle {
      width: 86px;
      height: 44px;
      border-radius: 999px;
      border: 2px solid #85878a;
      background: #202124;
      position: relative;
    }

    .toggle i {
      position: absolute;
      top: 5px;
      left: 6px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #aaa;
    }

    .toggle.on {
      border-color: var(--cyan);
      background: #003d4b;
    }

    .toggle.on i {
      left: 46px;
      background: #3ac5ef;
    }

    .main {
      display: grid;
      grid-template-columns: minmax(220px, .9fr) minmax(330px, 1.1fr);
      align-items: center;
      gap: 36px;
      margin-bottom: 28px;
    }

    .entities {
      display: grid;
      gap: 14px;
    }

    .entity {
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 38px;
      line-height: 1;
    }

    .entity .icon {
      width: 44px;
      height: 44px;
      color: #f0f0f0;
    }

    .info {
      display: grid;
      gap: 14px;
      font-size: 35px;
    }

    .info-row {
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 18px;
    }

    .setpoint {
      display: grid;
      grid-template-columns: 72px minmax(210px, auto) 72px;
      align-items: center;
      justify-content: end;
      gap: 18px;
      min-width: 0;
    }

    .setpoint strong {
      font-size: 72px;
      line-height: 1;
      font-weight: 300;
      white-space: nowrap;
      text-align: center;
    }

    .setpoint .step {
      color: #e8e8e8;
      width: 62px;
      height: 62px;
      padding: 12px;
      border-radius: 50%;
    }

    .controls {
      display: grid;
      gap: 10px;
    }

    .modes {
      display: grid;
      grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr));
      gap: 10px;
    }

    .mode {
      min-height: 72px;
      border-radius: 8px;
      background: var(--card-2);
      color: var(--muted);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      padding: 0 18px;
      font-size: 31px;
      line-height: 1;
      box-shadow: inset 0 -2px 0 rgba(255,255,255,.02);
    }

    .mode .icon { width: 44px; height: 44px; }
    .mode.compact { min-height: 62px; font-size: 28px; }
    .mode.compact .icon { width: 34px; height: 34px; }

    .mode.active {
      background: var(--cyan);
      color: white;
      box-shadow: inset 0 -4px 0 rgba(255,255,255,.7);
    }

    .mode.heat.active {
      background: var(--orange);
    }

    .hero .main {
      grid-template-columns: minmax(250px, .82fr) minmax(420px, 1.18fr);
    }

    .hero .setpoint strong {
      font-size: 78px;
    }

    .hero .modes:first-child .mode {
      min-height: 78px;
    }

    .fan-card .main {
      grid-template-columns: .8fr 1fr;
      margin-bottom: 26px;
    }

    .fan-card .setpoint strong { font-size: 66px; }
    .fan-card .setpoint { grid-template-columns: 56px 170px 56px; gap: 8px; }

    .small-card .main {
      grid-template-columns: 1fr 1.18fr;
      margin-bottom: 24px;
    }

    .small-card h2 { font-size: 52px; }
    .small-card .header-icon { font-size: 60px; }
    .small-card .setpoint strong { font-size: 54px; }
    .small-card .setpoint { grid-template-columns: 42px 178px 42px; gap: 6px; }
    .small-card .setpoint .step { width: 48px; height: 48px; padding: 10px; }

    .foot {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      color: #9eabb6;
      font-size: 22px;
    }
  </style>
</head>
<body>
  <section class="mast">
    <div>
      <h1>Simple Thermostat v4</h1>
      <p>Modern Home Assistant card layouts for climate, fan, and humidity devices.</p>
    </div>
    <div class="pill">Domain-aware controls</div>
  </section>

  <main class="grid">
    <article class="card hero">
      ${header({ title: "Thermostat", path: mdiRadiator, toggleLabel: "Furnace", toggleOn: true })}
      <section class="main">
        <div class="entities">
          ${entity({ path: mdiThermometer, value: "21.4 °C" })}
          ${entity({ path: mdiWaterPercent, value: "48%" })}
          ${entity({ path: mdiFan, value: "On" })}
        </div>
        ${setpoint("22.5 °C")}
      </section>
      <section class="controls">
        <div class="modes" style="--cols: 2">
          ${modeButton({ label: "Off", path: mdiPower })}
          ${modeButton({ label: "Heat", path: mdiFire, active: true, heat: true })}
        </div>
        <div class="modes" style="--cols: 4">
          ${modeButton({ label: "Away", path: mdiHomeExportOutline, compact: true })}
          ${modeButton({ label: "Eco", path: mdiLeaf, compact: true })}
          ${modeButton({ label: "Comfort", path: mdiSofa, compact: true })}
          ${modeButton({ label: "Sleep", path: mdiBed, active: true, compact: true })}
        </div>
      </section>
    </article>

    <article class="card medium fan-card">
      ${header({ title: "Range Hood Fan", path: mdiFan, off: true })}
      <section class="main">
        <div class="info">
          <div class="info-row"><span>State:</span><strong>Off</strong></div>
        </div>
        ${setpoint("0.0%")}
      </section>
      <section class="controls">
        <div class="modes" style="--cols: 4">
          ${modeButton({ label: "Low", path: mdiFanSpeed1, compact: true })}
          ${modeButton({ label: "Medium", path: mdiFanSpeed2, compact: true })}
          ${modeButton({ label: "High", path: mdiFanSpeed3, compact: true })}
          ${modeButton({ label: "Max", path: mdiFanSpeed3, compact: true })}
        </div>
        <div class="modes" style="--cols: 2">
          ${modeButton({ label: "Off", path: mdiPower, active: true })}
          ${modeButton({ label: "On", path: mdiPower })}
        </div>
      </section>
    </article>

    <article class="card medium small-card">
      ${header({ title: "Dehumidifier", path: mdiWaterPercent, off: true })}
      <section class="main">
        <div class="info">
          <div class="info-row"><span>Currently:</span><strong>47%</strong></div>
          <div class="info-row"><span>State:</span><strong>Off</strong></div>
        </div>
        ${setpoint("55.0%")}
      </section>
      <section class="controls">
        <div class="modes" style="--cols: 2">
          ${modeButton({ label: "Off", path: mdiPower, active: true })}
          ${modeButton({ label: "On", path: mdiPower })}
        </div>
      </section>
    </article>

    <article class="card wide small-card">
      ${header({ title: "Compact AC", path: mdiAirConditioner, off: true })}
      <section class="main" style="grid-template-columns: 320px 1fr;">
        <div class="entities">
          ${entity({ path: mdiThermometer, value: "23.0 °C" })}
          ${entity({ path: mdiFan, value: "Auto" })}
        </div>
        ${setpoint("23.0 °C")}
      </section>
      <section class="controls">
        <div class="modes" style="--cols: 4">
          ${modeButton({ label: "Off", path: mdiPower, active: true, compact: true })}
          ${modeButton({ label: "Cool", path: mdiSnowflake, compact: true })}
          ${modeButton({ label: "Dry", path: mdiPercent, compact: true })}
          ${modeButton({ label: "Fan only", path: mdiFan, compact: true })}
        </div>
      </section>
    </article>
  </main>

  <footer class="foot">
    <span>Fan speeds, humidity controls, richer entity rows, actions, and enhanced visuals.</span>
    <span>Home Assistant 2024.8+</span>
  </footer>
</body>
</html>`;

writeFileSync(resolve(root, "examples.preview.html"), html);
