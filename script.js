const grid = document.querySelector("#grid");
for (let o = 0; o < 16; ++o) {
  const row = document.createElement("div");
  row.setAttribute("class", "row");
  for (let i = 0; i < 16; ++i) {
    const square = document.createElement("div");
    square.setAttribute("class", "square");
    row.appendChild(square);
  };
  grid.appendChild(row);
};
    
