
let data = [];

async function loadCSV() {
  const res = await fetch("data(2).csv");
  const txt = await res.text();
  const rows = txt.split("\n").map(r => r.split(","));
  const headers = rows.shift();
  data = rows.map(r => {
    let o = {};
    headers.forEach((h,i)=>o[h]=r[i]);
    return o;
  });
}

function ask(){
  const q = document.getElementById("q").value.toLowerCase();
  const log = document.getElementById("log");
  log.innerHTML += `<p class='user'><b>You:</b> ${q}</p>`;
  let found = data.find(row =>
    Object.values(row).some(v => v && v.toLowerCase().includes(q))
  );
  log.innerHTML += `<p class='bot'><b>Bot:</b> ${found ? JSON.stringify(found) : "No answer in dataset"}</p>`;
}

loadCSV();
