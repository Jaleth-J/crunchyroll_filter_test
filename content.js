console.log("✅ Plugin gestartet");

// Hilfsfunktion, um den Sprachcode zu normalisieren (für den Vergleich)
function normalizeLanguage(lang) {
  const normalized = lang.toLowerCase(); // Alle Zeichen in Kleinbuchstaben
  if (normalized === "englisch") return "english";
  if (normalized === "französisch") return "français";
  if (normalized === "deutsch") return "deutsch";
  return normalized; // Standardmäßig den Wert zurückgeben
}

// 1. Sprache aus dem Storage holen
chrome.storage.local.get(["preferredLanguage"], (result) => {
  const sprache = normalizeLanguage(result.preferredLanguage || "deutsch");
  console.log("🎯 Gewählte Sprache:", sprache);

  // 2. Dann DOM prüfen (per Interval + gezieltem Selektor)
  function analysiereAudioSprachen() {
    const audioBlock = document.querySelector('[data-t="detail-row-audio-language"]');
    const sprachenElement = audioBlock?.querySelector('[data-t="details-item-description"]');

    if (sprachenElement) {
      const sprachen = sprachenElement.textContent.trim().toLowerCase();
      console.log("📦 Audiosprachen erkannt:", sprachen);

      // Vergleiche die Sprache mit der gespeicherten Sprache
      if (!sprachen.includes(sprache)) {
        document.body.innerHTML = `
          <div style="text-align:center; padding:50px; font-size:1.5em; color:#ff4e28;">
            Diese Serie hat keine <b>${sprache}</b>e Synchronisation.
          </div>
        `;
      } else {
        console.log(`✅ ${sprache} erkannt – alles gut.`);
      }

      return true;
    }

    return false;
  }

  // 3. Suche starten (robust via Interval)
  function startFilter() {
    const interval = setInterval(() => {
      if (analysiereAudioSprachen()) {
        clearInterval(interval);
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      console.warn("⏱️ Keine Audiosprache gefunden – Abbruch.");
    }, 15000);
  }

  // Starte, wenn das DOM bereit ist
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startFilter);
  } else {
    startFilter();
  }
});
