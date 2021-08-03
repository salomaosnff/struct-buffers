const partials = document.querySelectorAll("[data-include]");

for (const partial of partials) {
  fetch(partial.dataset.include)
    .then((res) => res.text())
    .then((text) => {
      partial.innerHTML = text;
      normalizePre(partial);
      replaceBuffers(partial);
    });
}
