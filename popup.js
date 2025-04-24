const select = document.getElementById("languageSelect");
const status = document.getElementById("status");


chrome.storage.local.get(["preferredLanguage"], (result) => {
  if (result.preferredLanguage) {
    select.value = result.preferredLanguage;
  }
});


select.addEventListener("change", () => {
  const selected = select.value;
  chrome.storage.local.set({ preferredLanguage: selected }, () => {
    status.textContent = "Gespeichert!";
    setTimeout(() => status.textContent = "", 1000);
  });
});
