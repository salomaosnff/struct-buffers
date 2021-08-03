function normalizePre(root = document) {
  const pre = root.getElementsByTagName("pre");

  for (let el of pre) {
    const space = el.innerHTML.match(/^\s+/gim)[0];
    const reg = new RegExp(`^${space}`, "gim");

    el.innerHTML = el.innerHTML.replace(reg, "").replace(/\n\s+$/gim, "");
  }
}
