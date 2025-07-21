const grid = document.querySelector("#grid");
let percentage = 70;
let size = 16;
let colour = () => "black";

window.addEventListener("resize", () => { 
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach(square => {
    const newWidth = (grid.clientWidth / size).toString() + "px";
    square.style.width = newWidth;
    square.style.height = newWidth;
  })
});

createGrid();
setGridWidth();

const changeSizeBtn = document.querySelector(".change-resolution");
changeSizeBtn.addEventListener("click", () => {
  let newSize = getUserInputNumber(1, 100, "number");
  if (newSize === null) return;
  size = newSize;
  createGrid();
});


const changeWidthBtn = document.querySelector(".change-width");
changeWidthBtn.addEventListener("click", () => {
  percentage = getUserInputNumber(1, 100, "pecentage");
  setGridWidth();
});

const changeColourBtn = document.querySelector(".change-colour")
let changeColour = false;
changeColourBtn.addEventListener("click", () => {
  changeColour = true;

  const currentColour = changeColourBtn.textContent.split(" "); 
  changeColourBtn.classList.toggle("black");
  changeColourBtn.classList.toggle("rgb");
  currentColour[1] = (currentColour[1] === "Black") ? "RGB" : "Black";
  changeColourBtn.textContent = currentColour.join(" ");

  colour = () => (currentColour[1] === "Black") ? "black" : `rgb(${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)})`;
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

function createGrid() {
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
      square.addEventListener("mouseenter", evt => evt.target.style.backgroundColor = colour());
      row.appendChild(square);
    };
    grid.appendChild(row);
  };
};

function setGridWidth() {
  grid.style.width =`${percentage}vw`;
  window.dispatchEvent(new Event("resize"));
}
