/** @type {HTMLCollectionOf<HTMLPreElement>} */
let counter = 0;

function getTooltip(byte) {
  if (typeof byte === "number" && !Number.isNaN(byte)) {
    return [
      `Bin: ${byte.toString(2).padStart(8, "0")}`,
      `Hex: ${byte.toString(16).toUpperCase().padStart(2, "0")}`,
      `Dec: ${byte}`,
    ].join("\n");
  }

  return "NULL";
}

function getHexTable(uuid, bytes, bytesPerLine = 16) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const theadTr = document.createElement("tr");
  const theadTrTh = document.createElement("th");
  const bytesTr = document.createElement("tr");
  const colgroup = document.createElement("colgroup");

  colgroup.append(document.createElement("col"));

  for (let i = 0; i <= bytesPerLine; i++) {
    const th = document.createElement("th");

    th.innerText = i < 1 ? "Bytes" : String(i);

    bytesTr.appendChild(th);
  }

  table.classList.add("buffer--hex", uuid);

  theadTrTh.innerText = `Hexadecimal (${bytes.length} bytes)`;
  theadTrTh.setAttribute("colspan", "100%");

  let lineCount = Math.ceil(bytes.length / bytesPerLine);

  for (let l = 1; l <= lineCount; l++) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");

    th.classList.add("bytes-header");

    th.innerText = String(l * bytesPerLine);

    tr.append(th);

    for (let c = 0; c < bytesPerLine; c++) {
      let index = l * c;
      const byte = bytes[index];
      const td = document.createElement("td");
      const col = document.createElement("col");
      const byteClass = `${uuid}-byte-${index}`;

      colgroup.append(col);

      td.classList.add(byteClass);
      td.setAttribute("data-group", `|${byteClass}|`);
      td.setAttribute("data-group-target", byteClass);
      td.title = getTooltip(byte);

      if (index < bytes.length) {
        td.innerText = byte.toString(16).padStart(2, "0").toUpperCase();
      } else {
        td.innerText = "--";
        td.classList.add("null-byte");
      }

      tr.append(td);
    }

    table.append(tr);
  }

  theadTr.append(theadTrTh);
  thead.append(theadTr, bytesTr);
  table.append(colgroup, thead);

  return table;
}

function getDecTable(uuid, bytes, bytesPerLine = 16) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const theadTr = document.createElement("tr");
  const theadTrTh = document.createElement("th");
  const bytesTr = document.createElement("tr");
  const colgroup = document.createElement("colgroup");

  colgroup.append(document.createElement("col"));

  for (let i = 0; i <= bytesPerLine; i++) {
    const th = document.createElement("th");
    const col = document.createElement("col");

    th.innerText = i < 1 ? "Bytes" : String(i);

    bytesTr.appendChild(th);
    colgroup.append(col);
  }

  table.classList.add("buffer--dec", uuid);

  theadTrTh.innerText = `Decimal (${bytes.length} bytes)`;
  theadTrTh.setAttribute("colspan", "100%");

  let lineCount = Math.ceil(bytes.length / bytesPerLine);

  for (let l = 1; l <= lineCount; l++) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");

    th.classList.add("byte-header");

    th.innerText = String(l * bytesPerLine);

    tr.append(th);

    for (let c = 0; c < bytesPerLine; c++) {
      let index = l * c;
      const byteClass = `${uuid}-byte-${index}`;
      const byte = bytes[index];
      const td = document.createElement("td");

      td.title = getTooltip(byte);
      td.classList.add(byteClass);
      td.setAttribute("data-group", `|${byteClass}|`);
      td.setAttribute("data-group-target", byteClass);

      if (index < bytes.length) {
        td.innerText = byte.toString();
      } else {
        td.innerText = "---";
        td.classList.add("null-byte");
      }

      tr.append(td);
    }

    table.append(tr);
  }

  theadTr.append(theadTrTh);
  thead.append(theadTr, bytesTr);
  table.append(colgroup, thead);

  return table;
}

function getBinTable(uuid, bytes, bytesPerLine = 4) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const theadTr = document.createElement("tr");
  const theadTrTh = document.createElement("th");
  const bytesTr = document.createElement("tr");
  const colgroup = document.createElement("colgroup");

  colgroup.append(document.createElement("col"));

  for (let i = 0; i <= bytesPerLine; i++) {
    const th = document.createElement("th");
    const col = document.createElement("col");

    col.span = 8;

    if (i === 0) {
      th.innerText = "Bytes";
    } else {
      th.innerText = String(i);
      th.colSpan = 8;
    }

    bytesTr.append(th);
    colgroup.append(col);
  }

  table.classList.add("buffer--bin", uuid);

  theadTrTh.innerText = `Binário (${bytes.length} bytes)`;
  theadTrTh.setAttribute("colspan", "100%");

  let lineCount = Math.ceil(bytes.length / bytesPerLine);

  for (let l = 0; l < lineCount; l++) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");

    th.classList.add("bytes-header");

    th.innerText = String((l + 1) * bytesPerLine);

    tr.append(th);

    for (let c = 0; c < bytesPerLine; c++) {
      const index = l * bytesPerLine + c;
      const byte = bytes[index];

      for (let b = 0; b < 8; b++) {
        const td = document.createElement("td");
        const byteClass = `${uuid}-byte-${index}`;
        const bitClass = `${uuid}-bit-${index * 8 + b}`;
        td.classList.add(byteClass, bitClass);
        td.setAttribute("data-group", `|${byteClass}|${bitClass}|`);
        td.setAttribute("data-group-target", `${bitClass}`);
        td.title = getTooltip(byte);
        if (index < bytes.length) {
          td.innerText = ((byte >> (7 - b)) & 1).toString(2);
        } else {
          td.innerText = "-";
          td.classList.add("null-byte");
        }
        tr.append(td);
      }
    }

    table.append(tr);
  }

  theadTr.append(theadTrTh);
  thead.append(theadTr, bytesTr);
  table.append(colgroup, thead);

  return table;
}

function toBytes(text) {
  return text
    .trim()
    .split(/[\s\n]+/)
    .map((n) => Number(n))
    .filter((v) => !Number.isNaN(v));
}

function prevent(e) {
  e.preventdefault();
}

let hoverElements = new Map();

function hover(e) {
  const elements = e.target.dataset.groupTarget
    .split("|")
    .filter((v) => v)
    .flatMap((g) =>
      Array.from(document.querySelectorAll(`[data-group*="|${g}|"]`))
    );

  hoverElements.set(e.target, elements);

  for (const el of elements) {
    el.classList.add("hover");
  }
}

function unhover(e) {
  const elements = hoverElements.get(e.target) ?? [];

  for (const el of elements) {
    el.classList.remove("hover");
  }

  hoverElements.delete(e.target);
}

function replaceBuffers(root = document) {
  const buffers = root.getElementsByClassName("buffer");

  for (const el of buffers) {
    if ("ignore" in el.dataset) continue;

    let uuid = el.id ?? `buffer-${counter++}`;
    const types = new Set((el.dataset.type ?? "hex")?.split(","));
    const bytes = toBytes(el.innerText);
    const tables = document.createElement("div");

    tables.classList.add("buffer");

    if (types.has("bin")) tables.appendChild(getBinTable(uuid, bytes));
    if (types.has("hex")) tables.appendChild(getHexTable(uuid, bytes));
    if (types.has("dec")) tables.appendChild(getDecTable(uuid, bytes));

    tables.setAttribute("data-ignore", "true");

    el.replaceWith(tables);
  }

  const links = document.querySelectorAll("[data-group-target]");

  for (const a of links) {
    a.addEventListener("mouseenter", hover);
    a.addEventListener("mouseout", unhover);
    a.addEventListener("click", prevent);
  }
}
