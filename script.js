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

const colours = [{name: "Black", class: "black", colourFunction: () => {return "black"}},
               {name: "RGB", class: "rgb", colourFunction() {return `rgb(${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)})`}}, 
               {name: "Erase", class: "erase", colourFunction() {return "white"}}
]
let currentColour = 0;
const changeColourBtn = document.querySelector(".change-colour")
changeColourBtn.addEventListener("click", () => {
  currentColour++;

  changeColourBtn.classList.remove(colours[(currentColour + colours.length - 1) % colours.length].class);
  changeColourBtn.classList.add(colours[currentColour % colours.length].class);

  let changeColourBtnText = changeColourBtn.textContent.split(" ")[0] + " " + colours[currentColour % colours.length].name;
  changeColourBtn.textContent =  changeColourBtnText; 
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
      square.addEventListener("mouseenter", evt => evt.target.style.backgroundColor = colours[currentColour % colours.length].colourFunction());
      row.appendChild(square);
    };
    grid.appendChild(row);
  };
};

function setGridWidth() {
  grid.style.width =`${percentage}vw`;
  window.dispatchEvent(new Event("resize"));
}
