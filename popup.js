const select = document.getElementById("languageSelect");
const status = document.getElementById("status");

// Sprache aus storage laden
chrome.storage.local.get(["preferredLanguage"], (result) => {
  if (result.preferredLanguage) {
    select.value = result.preferredLanguage;
  }
});

// Sprache speichern
select.addEventListener("change", () => {
  const selected = select.value;
  chrome.storage.local.set({ preferredLanguage: selected }, () => {
    status.textContent = "Gespeichert!";
    setTimeout(() => status.textContent = "", 1000);
  });
});
