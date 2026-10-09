(function () {
  const WEIGHTS_KEY = "tp_sigrid_gewichte";
  const ACTIVE_DAY_KEY = "tp_sigrid_active_day";
  const HISTORY_SHOWN = 5;

  const tabsEl = document.getElementById("day-tabs");
  const dayHeaderEl = document.getElementById("day-header");
  const exerciseListEl = document.getElementById("exercise-list");
  const progressFillEl = document.getElementById("progress-fill");
  const progressTextEl = document.getElementById("progress-text");
  const resetBtnEl = document.getElementById("reset-btn");
  const exportBtnEl = document.getElementById("export-btn");
  const importBtnEl = document.getElementById("import-btn");
  const importFileEl = document.getElementById("import-file");
  const storageWarningEl = document.getElementById("storage-warning");

  // ---------- Speicher ----------

  const memoryStore = {};
  let storageOk = true;

  function storeGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      storageOk = false;
      return key in memoryStore ? memoryStore[key] : null;
    }
  }

  function storeSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      storageOk = false;
      memoryStore[key] = value;
    }
  }

  function storeRemove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      delete memoryStore[key];
    }
  }

  function readJson(key, fallback) {
    const raw = storeGet(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function todayKey() {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${m}-${day}`; // lokales Datum YYYY-MM-DD
  }

  function formatDate(iso) {
    const [y, m, d] = iso.split("-");
    return `${d}.${m}.${y}`;
  }

  function formatKg(kg) {
    return kg.toLocaleString("de-DE", { maximumFractionDigits: 2 });
  }

  function exerciseKey(uebung) {
    return (uebung.key || uebung.name).trim().toLowerCase();
  }

  // Gewichte: { [exerciseKey]: [{ datum: "YYYY-MM-DD", kg: Number }, ...] } (chronologisch)
  function loadWeights() {
    const data = readJson(WEIGHTS_KEY, {});
    return data && typeof data === "object" ? data : {};
  }

  function saveWeights(data) {
    storeSet(WEIGHTS_KEY, JSON.stringify(data));
  }

  function historyFor(key) {
    const list = loadWeights()[key];
    return Array.isArray(list) ? list : [];
  }

  function setTodayWeight(key, kg) {
    const data = loadWeights();
    const list = Array.isArray(data[key]) ? data[key] : [];
    const today = todayKey();
    const rest = list.filter((e) => e.datum !== today);
    if (kg !== null) rest.push({ datum: today, kg });
    rest.sort((a, b) => a.datum.localeCompare(b.datum));
    if (rest.length) data[key] = rest;
    else delete data[key];
    saveWeights(data);
  }

  function parseKg(text) {
    const cleaned = text.replace(/kg/i, "").replace(",", ".").trim();
    if (cleaned === "") return null;
    const n = Number(cleaned);
    return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : NaN;
  }

  // Satzfortschritt: gilt nur für den heutigen Tag
  function progressKey(dayId) {
    return `tp_sigrid_saetze_${todayKey()}_${dayId}`;
  }

  function loadProgress(dayId) {
    return readJson(progressKey(dayId), {});
  }

  function saveProgress(dayId, progress) {
    storeSet(progressKey(dayId), JSON.stringify(progress));
  }

  function cleanupOldProgress() {
    try {
      const prefix = "tp_sigrid_saetze_";
      const today = todayKey();
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith(prefix) && !k.startsWith(prefix + today)) {
          localStorage.removeItem(k);
        }
      }
    } catch (e) {
      /* ohne localStorage nichts aufzuräumen */
    }
  }

  // ---------- Tagesauswahl ----------

  function dayForToday() {
    const wd = new Date().getDay();
    const match = TRAININGSPLAN.find((d) => d.wochentage.includes(wd));
    return match ? match.id : null;
  }

  let activeDayId = dayForToday() || storeGet(ACTIVE_DAY_KEY) || TRAININGSPLAN[0].id;
  if (!TRAININGSPLAN.some((d) => d.id === activeDayId)) activeDayId = TRAININGSPLAN[0].id;

  function selectDay(id) {
    activeDayId = id;
    storeSet(ACTIVE_DAY_KEY, id);
    renderTabs();
    renderDay();
  }

  function renderTabs() {
    tabsEl.innerHTML = "";
    TRAININGSPLAN.forEach((day) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "day-tab" + (day.id === activeDayId ? " active" : "") + (day.optional ? " optional" : "");
      btn.innerHTML = `${day.kurz}<span class="tab-sub">${day.titel}</span>`;
      btn.addEventListener("click", () => selectDay(day.id));
      tabsEl.appendChild(btn);
    });
  }

  // ---------- Darstellung ----------

  function weightInfoHtml(key) {
    const list = historyFor(key);
    if (!list.length) {
      return `<div class="weight-last muted">Noch kein Gewicht eingetragen</div>`;
    }
    const last = list[list.length - 1];
    const prev = list.length > 1 ? list[list.length - 2] : null;
    let trend = "";
    if (prev) {
      const diff = Math.round((last.kg - prev.kg) * 100) / 100;
      const cls = diff > 0 ? "up" : diff < 0 ? "down" : "same";
      const sign = diff > 0 ? "+" : "";
      trend = `<span class="trend ${cls}">${sign}${formatKg(diff)} kg</span>`;
    }
    const rows = list
      .slice(-HISTORY_SHOWN)
      .reverse()
      .map((e) => `<li><span>${formatDate(e.datum)}</span><span>${formatKg(e.kg)} kg</span></li>`)
      .join("");
    return `
      <div class="weight-last">Zuletzt: <strong>${formatKg(last.kg)} kg</strong> am ${formatDate(last.datum)} ${trend}</div>
      ${list.length > 1 ? `<details class="weight-history"><summary>Verlauf (${list.length})</summary><ul>${rows}</ul></details>` : ""}
    `;
  }

  function renderDay() {
    const day = TRAININGSPLAN.find((d) => d.id === activeDayId);
    if (!day) return;

    dayHeaderEl.innerHTML = `
      <h2>${day.tag}: ${day.titel}${day.optional ? ' <span class="wochentag">(optional)</span>' : ""}</h2>
      ${day.fokus ? `<div class="fokus">${day.fokus}</div>` : ""}
    `;

    const progress = loadProgress(day.id);
    exerciseListEl.innerHTML = "";

    day.uebungen.forEach((uebung, uIdx) => {
      const key = exerciseKey(uebung);
      const list = historyFor(key);
      const current = list.length ? formatKg(list[list.length - 1].kg) : "";
      const checkedArr = progress[uIdx] || [];

      const setsHtml = Array.from({ length: uebung.saetze })
        .map(
          (_, sIdx) => `
            <label class="set-toggle">
              <input type="checkbox" data-ex="${uIdx}" data-set="${sIdx}" ${checkedArr[sIdx] ? "checked" : ""} />
              <span class="set-circle">${sIdx + 1}</span>
            </label>`
        )
        .join("");

      const card = document.createElement("div");
      card.className = "exercise-card";
      if (checkedArr.filter(Boolean).length === uebung.saetze) card.classList.add("all-done");

      card.innerHTML = `
        <div class="exercise-name">${uebung.name}</div>
        <div class="exercise-meta">
          ${uebung.geraet ? `<span class="badge">${uebung.geraet}</span>` : ""}
          <span class="badge badge-strong">${uebung.saetze} × ${uebung.wdh}</span>
        </div>
        ${uebung.hinweis ? `<div class="hinweis">${uebung.hinweis}</div>` : ""}
        <div class="exercise-body">
          <div class="sets-row">${setsHtml}</div>
          <label class="weight-field">
            <span class="weight-label">Gewicht</span>
            <span class="weight-input-wrap">
              <input type="text" inputmode="decimal" autocomplete="off" class="weight-input"
                     value="${current}" placeholder="–" aria-label="Gewicht in kg für ${uebung.name}" />
              <span class="unit">kg</span>
            </span>
          </label>
        </div>
        <div class="weight-info">${weightInfoHtml(key)}</div>
        <div class="weight-error" hidden>Bitte eine Zahl eingeben, z.&nbsp;B. 12,5</div>
      `;

      const input = card.querySelector(".weight-input");
      const infoEl = card.querySelector(".weight-info");
      const errorEl = card.querySelector(".weight-error");

      input.addEventListener("change", () => {
        const kg = parseKg(input.value);
        if (Number.isNaN(kg)) {
          errorEl.hidden = false;
          input.classList.add("invalid");
          return;
        }
        errorEl.hidden = true;
        input.classList.remove("invalid");
        setTodayWeight(key, kg);
        const updated = historyFor(key);
        input.value = updated.length ? formatKg(updated[updated.length - 1].kg) : "";
        infoEl.innerHTML = weightInfoHtml(key);
        card.classList.add("saved");
        setTimeout(() => card.classList.remove("saved"), 900);
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") input.blur();
      });

      exerciseListEl.appendChild(card);
    });

    exerciseListEl.querySelectorAll('.set-toggle input[type="checkbox"]').forEach((cb) => {
      cb.addEventListener("change", () => {
        const uIdx = Number(cb.dataset.ex);
        const sIdx = Number(cb.dataset.set);
        const p = loadProgress(day.id);
        const arr = p[uIdx] || [];
        arr[sIdx] = cb.checked;
        p[uIdx] = arr;
        saveProgress(day.id, p);
        const card = cb.closest(".exercise-card");
        card.classList.toggle("all-done", arr.filter(Boolean).length === day.uebungen[uIdx].saetze);
        updateProgressBar(day);
      });
    });

    updateProgressBar(day);
    storageWarningEl.hidden = storageOk;
  }

  function updateProgressBar(day) {
    const progress = loadProgress(day.id);
    let total = 0;
    let done = 0;
    day.uebungen.forEach((uebung, uIdx) => {
      total += uebung.saetze;
      done += (progress[uIdx] || []).slice(0, uebung.saetze).filter(Boolean).length;
    });
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    progressFillEl.style.width = `${pct}%`;
    progressTextEl.textContent = `${done} / ${total} Sätze erledigt (${pct}%)`;
  }

  resetBtnEl.addEventListener("click", () => {
    if (!confirm("Abgehakte Sätze für diesen Tag zurücksetzen? Die Gewichte bleiben erhalten.")) return;
    storeRemove(progressKey(activeDayId));
    renderDay();
  });

  // ---------- Sicherung ----------

  exportBtnEl.addEventListener("click", () => {
    const payload = { app: "tp-sigrid", version: 1, exportiert: new Date().toISOString(), gewichte: loadWeights() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trainingsgewichte_${todayKey()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  importBtnEl.addEventListener("click", () => importFileEl.click());

  importFileEl.addEventListener("change", () => {
    const file = importFileEl.files && importFileEl.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const incoming = parsed && parsed.gewichte;
        if (!incoming || typeof incoming !== "object") throw new Error("format");
        if (!confirm("Gesicherte Gewichte mit den vorhandenen zusammenführen? Bei gleichem Datum gilt der Wert aus der Datei.")) return;
        const data = loadWeights();
        Object.keys(incoming).forEach((key) => {
          if (!Array.isArray(incoming[key])) return;
          const byDate = {};
          (data[key] || []).forEach((e) => (byDate[e.datum] = e.kg));
          incoming[key].forEach((e) => {
            if (e && /^\d{4}-\d{2}-\d{2}$/.test(e.datum) && Number.isFinite(e.kg)) byDate[e.datum] = e.kg;
          });
          data[key] = Object.keys(byDate)
            .sort()
            .map((datum) => ({ datum, kg: byDate[datum] }));
        });
        saveWeights(data);
        renderDay();
        alert("Import abgeschlossen.");
      } catch (e) {
        alert("Die Datei konnte nicht gelesen werden.");
      } finally {
        importFileEl.value = "";
      }
    };
    reader.readAsText(file);
  });

  cleanupOldProgress();
  renderTabs();
  renderDay();
})();
