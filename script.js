const grid = document.querySelector("#grid");
for (let o = 0; o < 16; ++o) {
  const row = document.createElement("div");
  row.setAttribute("class", "row");
  for (let i = 0; i < 16; ++i) {
    const square = document.createElement("div");
    square.setAttribute("class", "square");
    square.addEventListener("mouseenter", evt => evt.target.style.backgroundColor = "black");
    row.appendChild(square);
  };
  grid.appendChild(row);
};

