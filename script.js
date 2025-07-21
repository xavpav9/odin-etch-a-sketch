const grid = document.querySelector("#grid");
let percentage = 70;
let size = 16;

window.addEventListener("resize", () => { 
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach(square => {
    const newWidth = (grid.clientWidth / size).toString() + "px";
    square.style.width = newWidth;
    square.style.height = newWidth;
  })
});

createGrid(size);
setGridWidth();

const changeSizeBtn = document.querySelector(".change-resolution");
changeSizeBtn.addEventListener("click", () => {
  size = getUserInputNumber(1, 100, "number");
  if (size === null) return;
  createGrid(size);
});


const changeWidthBtn = document.querySelector(".change-width");
changeWidthBtn.addEventListener("click", () => {
  percentage = getUserInputNumber(1, 100, "pecentage");
  setGridWidth();
});


function getUserInputNumber(low, high, display) {
  let num = NaN;
  while (num > high || num < low || isNaN(num)) {
    num = prompt(`Enter a ${display} between ${low} and ${high}.`);
    if (num === null || num === "") return null;
    num = +num;
  };
  return num;
};

function createGrid(size) {
  while (grid.firstElementChild) grid.firstElementChild.remove();
  const newWidth = (grid.clientWidth / size).toString() + "px";
  for (let o = 0; o < size; ++o) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let i = 0; i < size; ++i) {
      const square = document.createElement("div");
      square.setAttribute("class", "square");
      square.style.width = newWidth;
      square.style.height = newWidth;
      square.addEventListener("mouseenter", evt => evt.target.style.backgroundColor = "black");
      row.appendChild(square);
    };
    grid.appendChild(row);
  };
};

function setGridWidth() {
  grid.style.width =`${percentage}vw`;
  window.dispatchEvent(new Event("resize"));
}
